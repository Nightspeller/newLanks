var express = require('express');
var Departments = require('../modelsDB/departments').Departments;
var formidable = require('formidable');
var config = require('./../bin/config');
var app = require('./../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    Departments.find({}, function(err, departments) {
        if (err) throw err;
        res.render('index', {allDepartments: departments});
    });
});

router.post('/', function(req,res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        if(err) throw err;

        var mailType = 'emailTemplates/requestPrice';
        var mailSettings = {
            to: config.get('questionEmail'), // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Сообщение с сайта - запрос цены', // REQUIRED.
            mailData: fields
        };

        app.mailer.send(mailType, mailSettings , function (err) {
            if (err) {
                console.log(err);
                res.send('There was an error sending the email');
                return;
            }
            res.send('Email Sent');
        });
    });
});

module.exports = router;
