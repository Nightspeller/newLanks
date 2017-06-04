
var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var config = require('./../bin/config');
var app = require('./../app');
var Departments = require('../modelsDB/departments').Departments;

router.get('/', function(req, res) {
/*    Departments.find({},'city skype mainPhone additionalPhone', function(err, departments){
        if(err) throw err;
        res.render('question', {allDepartments: departments});
    });*/
});

router.post('/', function(req,res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        if(err) throw err;

        var mailType = '';
        var to = config.get('questionEmail');
        var mailSettings = {};
        if (req.query.country === 'belarus') to = config.get('questionEmailBelarus');

        if (req.query.type === 'callMe'){
            mailType = 'emailTemplates/callMeEmail';
            mailSettings = {
                to: to, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Сообщение с сайта - обратный звонок', // REQUIRED.
                mailData: fields
            }
        } else {
            mailType = 'emailTemplates/qualityEmail';
            mailSettings = {
                to: to, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Сообщение с сайта - письмо руководству', // REQUIRED.
                mailData: fields
            }
        }

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