var Departments = require('../modelsDB/departments').Departments;
var CombinedCargoPrices = require('../modelsDB/combinedCargoPrices').CombinedCargoPrices;
var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var util = require('util');
var fs = require('fs');


router.get('/', function(req, res) {
    Departments.find({}, function(err, departments){
        if(err) throw err;
        CombinedCargoPrices.find({}, function(err, combinedCargoPrices) {
            if (err) throw err;
            res.render('simpleCalculate', {allDepartments: departments, combinedCargoPrices: combinedCargoPrices[0]});
        });
    });
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        if ( fields.cityFrom === fields.cityTo) {
            res.send('Cities are the same or missing');
            return;
        }
        if (!fields.cityFrom) {
            res.send('City from is missing');
            return;
        }
        if (!fields.cityTo) {
            res.send('City to is missing');
            return;
        }
        if (!fields.weight && !fields.volume) {
            res.send('Both weight and volume are not specified.');
            return;
        }
        CombinedCargoPrices.findOne({cityFrom: fields.cityFrom, cityTo: fields.cityTo}, function(err, combinedCargoPrices) {
            if (err) throw err;

            var resultWeight = 0;
            var resultPrice = 0;
            resultWeight = fields.weight ? fields.weigth : fields.volume*210;

            if (fields.weight) {
                resultWeight = fields.weight;
            } else {
                resultWeight = fields.volume*210;
            }

            if (fields.weight && fields.volume) {
                if (fields.volume*210 > fields.weight) {
                    resultWeight = fields.volume*210;
                }
            }

            if (resultWeight<=100) resultPrice = resultWeight*combinedCargoPrices.category1;
            if (resultWeight>100 && resultWeight<=200) resultPrice = resultWeight*combinedCargoPrices.category2;
            if (resultWeight>200 && resultWeight<=500) resultPrice = resultWeight*combinedCargoPrices.category3;
            if (resultWeight>500 && resultWeight<=1000) resultPrice = resultWeight*combinedCargoPrices.category4;
            if (resultWeight>1000 && resultWeight<=1500) resultPrice = resultWeight*combinedCargoPrices.category5;
            if (resultWeight>1500 && resultWeight<=2000) resultPrice = resultWeight*combinedCargoPrices.category6;
            if (resultWeight>2000 && resultWeight<=3000) resultPrice = resultWeight*combinedCargoPrices.category7;
            if (resultWeight>3000 && resultWeight<=5000) resultPrice = resultWeight*combinedCargoPrices.category8;
            if (resultWeight>5000) resultPrice = combinedCargoPrices.category9;

            if (resultPrice < 300 && resultPrice !== combinedCargoPrices.category9) resultPrice = 300;

            res.send({price: resultPrice});
        });
    });
});
module.exports = router;
