var express = require('express');
const router = express.Router();
//var FuturesList = models.User;
var models = require('../models.js')
var FuturesList = models.FuturesList

router.get('/getfutures', function(req, res) {
  FuturesList.find()
  .then((lists) => {
    console.log('LISTS', lists)
    res.json({success: true, lists: lists})
  })
})

module.exports = router
