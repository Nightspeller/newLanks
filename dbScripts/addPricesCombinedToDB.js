var CombinedCargoPrices = require('./../modelsDB/combinedCargoPrices').CombinedCargoPrices;

fs = require('fs')
fs.readFile('prices.csv', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var dataArray = data.split('\n');

    for (var i=1; i<dataArray.length; i++){
        dataArray[i] = dataArray[i].split(';');

        var newCombinedCargoPricesObj = { index:  i-1,
            cityFrom: dataArray[i][0],
            cityTo: dataArray[i][1],
            minimum: 300,
            category1:  dataArray[i][2],
            category2:  dataArray[i][3],
            category3:  dataArray[i][4],
            category4:  dataArray[i][5],
            category5:  dataArray[i][6],
            category6:  dataArray[i][7],
            category7:  dataArray[i][8],
            category8:  dataArray[i][9],
            category9:  'personal'
        };

        var newCombinedCargoPrices = new CombinedCargoPrices(newCombinedCargoPricesObj);
        newCombinedCargoPrices.save(function(err){
            if(err) throw err;
        });
    }
    console.log(dataArray);
});

/*
for (var i = 0; i < departments_data.length; i++) {
    for (var j in departments_data[i]){
        if(departments_data[i][j] === '-') departments_data[i][j] = "";
    }

    var departmentObj = { index:  departments_data[i].number,
        city: departments_data[i].name,
        cityEng: departments_data[i].gerb,
        address:  departments_data[i].index+' '+departments_data[i].street+' '+departments_data[i].house+' '+departments_data[i].office,
        email:  departments_data[i].e_mail,
        mainPhone: departments_data[i].phone,
        additionalPhone: departments_data[i].additional_phone,
        fax: departments_data[i].fax,
        skype: departments_data[i].skype,
        stockAddress:  departments_data[i].street_stock+' '+departments_data[i].building+' '+departments_data[i].place,
        coordinates: departments_data[i].coordinates,
        mapID: departments_data[i].map_id
    };

    var newCombinedCargoPrices = new CombinedCargoPrices(newCombinedCargoPricesObj);
    newCombinedCargoPrices.save(function(err){
        if(err) throw err;
    });

}*/
