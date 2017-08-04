const express = require('express')
const app = express()
var mongoose = require('mongoose');
const scrape = require('./scraper')
var models = require('./models.js');
var FuturesList = models.FuturesList;

connect = mongoose.connect(process.env.MONGODB_URI);

app.get('/', function(req,res){
  scrape(function(html){
    res.send(html)
  })
})



// app.get('/api/get_futures', function(req,res){
//
// })
//node-schedule

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
  console.log('Listening on port' + PORT)
})
