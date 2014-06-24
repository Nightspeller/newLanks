var express = require('express');
var Departments = require('../modelsDB/departments').Departments;
var News = require('../modelsDB/news').News;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    News.findOne({}).sort('-index').exec(function(err, news){
        if(err) throw err;
        Departments.find({}, function(err, departments) {
            if (err) throw err;
            res.render('index', {announce: news, allDepartments: departments});
        });
    });
});

module.exports = router;
