const express = require('express')
const app = express()
var mongoose = require('mongoose');
const scrape = require('./scraper')
var models = require('./models.js');
var FuturesList = models.FuturesList;
const routes = require("./routes/index")
const scrape2 = require('./spotScraper')

connect = mongoose.connect(process.env.MONGODB_URI);

app.get('/api/scrape', function(req,res){
  scrape2(function(html){
    res.send(html)
  })
})

app.use(routes);

app.use(express.static('public'))

// app.get('/api/get_futures', function(req,res){
//
// })
//node-schedule

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
  console.log('Listening on port' + PORT)
})
