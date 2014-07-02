var express = require('express');
var async = require('async');
var router = express.Router();

var CombinedCargoPrices = require('../modelsDB/combinedCargoPrices').CombinedCargoPrices;
var CityCargoPrices = require('../modelsDB/cityCargoPrices').CityCargoPrices;

router.get('/', function(req, res) {
  res.render('calculate', { });
});

router.post('/', function(req, res) {
   getPriceByWeight(req.body.data.split(';')[0],req.body.data.split(';')[1],req.body.data.split(';')[2], function(price){
       res.send(price.price+';'+price.priceCityFrom.price+';'+price.priceCityFrom.pricePerKilometer+';'+price.priceCityTo.price+';'+price.priceCityTo.pricePerKilometer);
   });
});

function getPriceByWeight(cityFrom, cityTo, weight, callback){
    var category;

    if (weight<=100) category = 1;
    if (weight>100 && weight<=200) category = 2;
    if (weight>200 && weight<=500) category = 3;
    if (weight>500 && weight<=1000) category = 4;
    if (weight>1000 && weight<=1500) category = 5;
    if (weight>1500 && weight<=2000) category = 6;
    if (weight>2000 && weight<=3000) category = 7;
    if (weight>3000 && weight<=5000) category = 8;
    if (weight>5000) category = 9;

    async.parallel([
        function(callback){
            CombinedCargoPrices.findOne({cityFrom: cityFrom, cityTo: cityTo}, function(err, combinedCargoPrices) {
                if (err) throw err;
                callback (null, combinedCargoPrices['category'+category]);
            })
        },
        function(callback){
            CityCargoPrices.findOne({city: cityFrom}, function(err, prices){
                if (err) throw err;
                callback (null, {price: prices.price[category],pricePerKilometer: prices.pricePerKilometer[category]});
            })
        },
        function(callback){
            CityCargoPrices.findOne({city: cityTo}, function(err, prices){
                if (err) throw err;
                callback (null, {price: prices.price[category],pricePerKilometer: prices.pricePerKilometer[category]});
            })
        }
    ],
    function(err, results){
        callback({price: results[0], priceCityFrom: results[1], priceCityTo: results[2]});
    });
}

module.exports = router;
