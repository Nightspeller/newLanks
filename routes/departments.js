var Departments = require('../modelsDB/departments').Departments;
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res) {
    if (req.query.city){
        Departments.findOne({cityEng: req.query.city}, function(err, departments){
            if(err) throw err;
            fs.exists('../views/include/'+req.query.city+'.hjs', function(exists) {
                if (err) throw err;
                if (exists) {
                    res.render('../views/include/'+req.query.city, function(err, additionalInfo){
                        if (err) throw err;
                        req.additionalInfo = res.locals.additionalInfo = additionalInfo;
                        res.render('departments', {mode: 'single',allDepartments: departments});
                    });
                } else {
                    res.render('departments', {mode: 'single',allDepartments: departments});
                }
            });
        });
    } else {
        Departments.find({}, function(err, departments){
            if(err) throw err;
            res.render('departments', {allDepartments: departments});
        });
    }
});

module.exports = router;
