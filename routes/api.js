const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Stock = require('../models/drink');

router.get('/stocks', (req, res) => {
  Stock.find({}, (err, stocks) => {
    if (err) res.json(err)
    res.json(stocks)
  })
})

router.get('/stocks/:stockid', (req, res) => {
  Stock.findById(req.params.stockid, (err, stock) => {
    if (err) res.json(err)
    res.json(stock)
  })
})

router.get('/stocks', (req, res) => {
  User.findById(req.user._id).populate('stocks').exec((err, user) => {
    if (err) res.json(err)
    res.json(user)
  }) 
})

router.get('/stocks/:stockid', (req, res) => {
  Stock.findById(req.params.drinkid, (err, stock) => {
    if (err) res.json(err)
    res.json(stock)
  })
})

router.post('/stocks', (req, res) =>{
  User.findById(req.user._id, function(err, user) {
    Stock.findById(
      req.body._id, 
      function(err,stock){
          user.stocks.push(stock)
          user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
      })
    })
  })
})

router.post('/users/:userid/stocks', (req, res) =>{
  User.findById(req.params.userid, function(err, user) {
    Stock.save({
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

router.put('/users/:userid/stocks/:stockid', (req, res) => {
  User.findById(
    req.params.userid,
    (err, user) => {
      Stock.findByIdAndUpdate (
        req.params.stockid,
        {
          name: req.body.name,
          ticker: req.body.ticker,
        },
        (err, stock) => {
          if (err) res.json(err)
          res.json(stock)
        }
      )
    }
  )
})

router.delete('/stocks/:stockid', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    user.stocks.pull(req.params.stockid)
    user.save(err => {
      if (err) res.json(err)
        res.json(user)
      })
    })
  })

module.exports = router;