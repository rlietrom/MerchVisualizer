var express = require('express');
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);
var Schema = mongoose.Schema;

var futuresSchema = new Schema({
  month_year: String,
  last: Number,
  priorSettle: Number,
  updatedAt: Date
});

var FuturesList = mongoose.model('FuturesList', futuresSchema);

module.exports = {
  FuturesList: FuturesList
};
