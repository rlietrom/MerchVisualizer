var express = require('express');
var app = express(app)
var FuturesList = models.User;
var models = require('../mmodels.js')
var FuturesList = models.FuturesList

app.get('/getfutures', function(req, res) {
  FuturesList.find()
  .then((lists) => {
    console.log('LISTS', lists)
    res.json({success: true, lists: lists})
  })
})
