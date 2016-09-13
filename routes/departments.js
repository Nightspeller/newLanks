var Departments = require('../modelsDB/departments').Departments;
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    if (req.query.city){
        Departments.findOne({cityEng: req.query.city}, function(err, department){
            if(err) throw err;
            res.render('department', {department: department});
        });
    } else {
        Departments.find({}, function(err, departments){
            if(err) throw err;
            for (var i=0; i < departments.length; i++){
              //  departments[i].satellites = departments[i].satellites.join(', ');
            }
            departments.sort(function(a,b){
                if (a.city > b.city) {
                    return 1
                } else {
                    return -1
                }
            });
            res.render('departments', {allDepartments: departments});
        });
    }
});

router.get('/json', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (req.query.city){
        Departments.findOne({cityEng: req.query.city}, function(err, departments){
            if(err) throw err;
            res.send(departments);
        });
    } else {
        Departments.find({}, function(err, departments){
            if(err) throw err;
            res.send(departments);
        });
    }
});

module.exports = router;