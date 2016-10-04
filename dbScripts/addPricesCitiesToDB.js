var CityCargoPrices = require('./../modelsDB/cityCargoPrices').CityCargoPrices;

fs = require('fs')
fs.readFile('sbor-dostavka.csv', 'utf8', function (err,priceData) {
    if (err) {
        return console.log(err);
    }
    fs.readFile('sbor-dostavka_milage.csv', 'utf8', function (err,perKilometerData) {
        if (err) {
            return console.log(err);
        }
        var dataArray = priceData.split('\n');
        var perKilometerDataArray = perKilometerData.split('\n');

        for (var i=1; i<dataArray.length; i++){
            dataArray[i] = dataArray[i].split(';');
            perKilometerDataArray[i] = perKilometerDataArray[i].split(';');

            var newCityCargoPricesObj = { index:  i-1,
                city: dataArray[i][0],
                price:  [dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4] ,dataArray[i][5], dataArray[i][6], dataArray[i][7], dataArray[i][8], dataArray[i][9], dataArray[i][10], dataArray[i][11], 'personal'],
                pricePerKilometer: [perKilometerDataArray[i][1], perKilometerDataArray[i][2], perKilometerDataArray[i][3], perKilometerDataArray[i][4] ,perKilometerDataArray[i][5], perKilometerDataArray[i][6], perKilometerDataArray[i][7], perKilometerDataArray[i][8], perKilometerDataArray[i][9], perKilometerDataArray[i][10], perKilometerDataArray[i][11], 'personal']
            };

            var newCityCargoPrices = new CityCargoPrices(newCityCargoPricesObj);
            newCityCargoPrices.save(function(err){
                if(err) throw err;
            });
        }
        console.log(dataArray);
    });
});
