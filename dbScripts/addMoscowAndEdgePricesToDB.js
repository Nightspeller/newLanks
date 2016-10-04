var moscowAndEdgePrices = require('./../modelsDB/moscowAndEdgePrices').moscowAndEdgePrices;

var fs = require('fs');
fs.readFile('prices-for-moscow.csv', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var dataArray = data.split('\n');

    for (var i = 0; i < dataArray.length; i++){
        dataArray[i] = dataArray[i].split(';');

        var newMoscowAndEdgePricesObj = { 
            index:  i,
            category: i,
            cityPrice: dataArray[i][1],
            zone1: dataArray[i][2],
            zone2:  dataArray[i][3],
            zone3:  dataArray[i][4],
            zone4:  dataArray[i][5]
        };

        var newMoscowAndEdgePrices = new moscowAndEdgePrices(newMoscowAndEdgePricesObj);
        newMoscowAndEdgePrices.save(function(err){
            if(err) throw err;
        });
    }
    console.log(dataArray);
});
