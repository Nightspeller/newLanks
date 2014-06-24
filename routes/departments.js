var Departments = require('../modelsDB/departments').Departments;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.query.city){
        Departments.findOne({cityEng: req.query.city}, function(err, departments){
            if(err) throw err;
            res.render('departments', {mode: 'single',allDepartments: departments});
        });
    } else {
        Departments.find({}, function(err, departments){
            if(err) throw err;
            res.render('departments', {allDepartments: departments});
        });
    }
});

module.exports = router;
