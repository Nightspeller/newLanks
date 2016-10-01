var Departments = require('../../modelsDB/departments').Departments;
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

var checkAuth = require('../../middleware/checkAuth');

router.get('/', checkAuth, function(req, res) {
    if (req.query.city){
        Departments.findOne({cityEng: req.query.city}, function(err, departments){
            if(err) throw err;
            res.render('editDepartment', {mode: 'single',allDepartments: departments});
        });
    } else {
        res.send('Department not found');
    }
});

router.post('/', checkAuth, function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        if (files.picture.name){
            fs.rename(files.picture.path, "./public/images/departments/" + fields.cityEng + '.png', function(err){
                if (err) throw err;
            });
        } else {
            fs.unlink(files.picture.path, function(err){
                if (err) throw err;
            });
        }
        Departments.findOne({index: fields.index}, function(err, department){
            if(err) throw err;
            if (department) {
                for (var i in fields){
                    if (i == 'satellites') fields[i] = fields[i].split(',');
                    department[i] = fields[i];
                }
                department.save(function(err){
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                })
            }
        });
    });
});

module.exports = router;
