const phantom = require('phantom')
var mongoose = require('mongoose')
var models = require('./models.js')
var FuturesList = models.FuturesList


var sitepage = null;
var phInstance = null;

phantom.create()
.then(instance => {
  phInstance = instance;
  return instance.createPage();
})
.then(page => {
  sitepage = page
  return sitepage.open('http://www.cmegroup.com/trading/agricultural/dairy/nonfat-dry-milk.html')
})
.then(status => {
  // console.log('STATUS', status)
  if(status === 'success') {
    sitepage.evaluate(function(){
      var rows = document.querySelectorAll('table#quotesFuturesProductTable1 tr')
      var arr = []
      for(var i = 2; i < rows.length; i++){
        var row = rows[i]
        var cells = row.querySelectorAll('td')
        var month = cells[0].innerText
        var last = cells[2].innerText
        var priorSettle = cells[4].innerText
        arr.push([month, last, priorSettle])
      }
      return arr
    })
    .then((array2d) => {
      array2d.forEach(function(array1d) {
        // console.log('ARRAY 1D', array1d)
        FuturesList.findOneAndUpdate({month_year: array1d[0]}, {last: array1d[1], priorSettle: array1d[2], updatedAt: new Date().toISOString()}, function(err, existingMonth) {
          if(err) {
            // console.log('could not find month, creating new')
            var newFuturesList = new FuturesList ({
              month_year: array1d[0],
              last: array1d[1],
              priorSettle: array1d[2],
              updatedAt: new Date().toISOString()
            })
            newFuturesList.save(function(err, list) {
              if(err) {
                // console.log("error saving lists")
              }
              else {
                // console.log("successfully saved in mlab")
              }
            })
          } else {
            // console.log('month updated!')
          }
        })
      })
      phInstance.exit();
    })
  }
})
.catch(error => {
  console.log(error);
});
