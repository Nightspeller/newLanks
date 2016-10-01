var moscowAndEdgePrices = require('../../modelsDB/moscowAndEdgePrices').moscowAndEdgePrices;
var express = require('express');
var router = express.Router();

var util = require('util');

router.get('/getPriceByWeightVolumeAndZone', function(req, res) {
    var weight = req.query.weight;
    var volume = req.query.volume;
    var zone = req.query.zone || 0;
    var length = req.query.length || 1;
    var resultPrice = 0;

    if (weight === undefined && volume === undefined) {
        res.send('Both weight and volume are not specified.');
    } else
    if (weight  === undefined || isNaN(weight) || weight <= 0) {
        res.send('Weight is not specified correctly.');
    } else
    if (volume === undefined || isNaN(volume) || volume <= 0) {
        res.send('Volume is not specified correctly.');
    } else
    if (zone === undefined || isNaN(zone) || zone < 0 || zone > 4) {
        res.send('Zone is not specified correctly.');
    } else
    if (length === undefined || isNaN(length) || length < 0) {
        res.send('Length is not specified correctly.');
    } else{
        var category = determineCategory(weight,volume);
        if (category === 10) {
            res.send('Weight or volume is too large');
        } else {
            moscowAndEdgePrices.find({category: category}, function(err, entry){
                if(err) throw err;
                switch(zone*1){
                    case 0:
                        resultPrice = entry[0].cityPrice;
                        break;
                    case 1:
                        resultPrice = entry[0].zone1;
                        break;
                    case 2:
                        resultPrice = entry[0].zone2;
                        break;
                    case 3:
                        resultPrice = entry[0].zone3;
                        break;
                    case 4:
                        resultPrice = entry[0].zone4;
                        break;
                }

                if (length >= 4) resultPrice*=1.2;
                if (length < 4 && length >= 2) resultPrice*=1.1;

                res.send({price: Math.floor(resultPrice)});
            });
        }
    }
});

function determineCategory(weight, volume) {
    var category;

    if (weight > 1500 || volume > 7) category = 10;
    if (weight <= 1500 && volume <= 7) category = 9;
    if (weight < 1250 && volume < 6) category = 8;
    if (weight < 1000 && volume < 4.5) category = 7;
    if (weight < 750 && volume < 3.5) category = 6;
    if (weight < 500 && volume < 2.5) category = 5;
    if (weight < 300 && volume < 1.5) category = 4;
    if (weight < 100 && volume < 0.5) category = 3;
    if (weight < 50 && volume < 0.3) category = 2;
    if (weight < 10 && volume < 0.1) category = 1;
    if (weight < 5 && volume < 0.05) category = 0;

    return category;
}

module.exports = router;
