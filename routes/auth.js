const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// router for signup
router.post('/signup', (req, res) => {
    // see if email is already in the database
    User.findOne({email: req.body.email}, (err, user) => {
    if (user) {
         // if yes then return an error 
         res.json({type: 'error', message: 'Email already exists'})

    } else {
         // if not already there then create user in the database
         let user = new User({
             name: req.body.name,
             email: req.body.email,
             password: req.body.password
         });
         user.save( (err, user) => {
             if (err) {
                 res.json({type: 'error', message: "database error creating user"})
             } else {
                // sign a token (this is the login step)
                var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: "1d"
                });
                // res.json the token (the browser needs to store this token)
                res.status(200).json({type: 'success', user: user.toObject(), token})
             }
         })
    }
   
    })
})

// route for login
router.post('/login', (req, res) => {
    // find user in db by email 
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            // if there is no user, return error
            res.json({type: 'error', message: 'Account not found'})
        } else {
             // if there is a user, check authentication 
             if (user.authenticated(req.body.password)) {
                 // if authenticated, sign a token (login)
                 var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                     expiresIn: "1d"
                 });
                 // return the token to be saved by the browser 
                 res.json({type: 'success', user: user.toObject(), token})
             } else {
                 res.json({type: 'error', message: 'Authentication failed'})
             }
        }
    })
})

//route for validating tokens 
router.post('/me/from/token', (req, res) => {
    // make sure they sent a token to check
    var token = req.body.token;
    if (!token) {
        // if no token then return error
        res.json({type: 'error', message: 'You must submit a valid token'})
    } else {
          // if token then verify it 
          jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // if token invalid, return error
                res.json({type: 'error', message: 'Invalid token. Please login again.'})
            } else {
                // if token valid then look up user in the database
                User.findById(user._id, (err, user) => {
                    // if the user doesnt exist then return an error 
                    if (err) {
                        res.json({type: 'error', message: 'Database error during validation'})
                    } else {
                        //right here, we could sign a new token or we could just
                        // return the existing one
                        // var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        //     expiresIn: "1d"
                        // });
                        // if user does exist then send back user and token
                        res.json({type: 'success', user: user.toObject(), token})
                    }
                })
            }
          })
    }
})



module.exports = router;