var Departments = require('../../modelsDB/departments').Departments;
var CityCargoPrices = require('../../modelsDB/cityCargoPrices').CityCargoPrices;
var express = require('express');
var router = express.Router();

var checkAuth = require('../../middleware/checkAuth');

router
    .get('/', checkAuth, function(req, res) {
        if (req.query.city){
            Departments.findOne({cityEng: req.query.city}, function(err, department){
                if(err) throw err;
                res.render('admin/editDepartment', {department: department});
            });
        } else {
            Departments.find({}, function(err, departments){
                if(err) throw err;
                res.render('admin/admin', {allDepartments: departments});
            });
        }
    });

module.exports = router;
