var Departments = require('../modelsDB/departments').Departments;
var CityCargoPrices = require('../modelsDB/cityCargoPrices').CityCargoPrices;
var express = require('express');
var router = express.Router();
//some random comment for testing
//another random thing for commit testing
router
    .get('/', function(req, res) {
        if (req.query.city){
            Departments.findOne({cityEng: req.query.city}, function(err, department){
                if(err) throw err;
                console.log(req.params.city);
                CityCargoPrices.findOne({city: req.query.city}, function(err, prices){
                    if(err) throw err;
                    var pricesObj = {};
                    pricesObj.price = {};
                    pricesObj.pricePerKm = {};
                    for (var i = 0; i < prices.price.length; i++) {
                        pricesObj.price['price'+i] = prices.price[i];
                        pricesObj.pricePerKm['price'+i] = prices.pricePerKilometer[i];
                    }
                    console.log(prices);
                    res.render('admin/editDepartment', {department: department, prices: pricesObj});
                });
            });

        } else {
            Departments.find({}, function(err, departments){
                if(err) throw err;
                res.render('admin/admin', {allDepartments: departments});
            });
        }
    });

module.exports = router;
