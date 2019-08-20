const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Stock = require('../models/stock');

router.get('/stocks', (req, res) => {
    Stock.find({}, (err, stocks) => {
        if (err) res.json(err)
        res.json(stocks)
    })
})

router.get("/stocks/:sid", (req, res) => {
    Stock.findById(req.params.sid, (err, stock) => {
    if (err) res.json(err)
    res.json(stock)
    })
})

// router.get('/stocks/', (req, res) => {
//   User.findById(req.user._id).populate('stocks').exec((err, user) => {
//     if (err) res.json(err)
//     res.json(user)
//   }) 
// })

router.post('/stocks/', (req, res) =>{
  User.findById(req.user._id, function(err, user) {
    Stock.create({
      name: req.body.name,
      ticker: req.body.ticker,
      user: req.params.userid
      }, function(err,stock){
          user.stocks.push(stock)
          user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
      })
    })
  })
})

router.put('/stocks/:sid', (req, res) => {
  User.findById(req.user._id, function(err, user) {
      Stock.findByIdAndUpdate (
        req.params.sid,
        {
          name: req.body.name,
          ticker: req.body.ticker,
          user: req.params.userid
        },
        (err, stock) => {
          if (err) res.json(err)
          res.json(stock)
        }
      )
    }
  )
})

router.delete('/stocks/:sid', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    Stock.deleteOne({_id: req.params.sid}, (err, user) => {
    if (err) res.json(err)
    res.json(user);
    })
  })
})

module.exports = router;