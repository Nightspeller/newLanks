
var express = require('express');
var router = express.Router();

var formidable = require('formidable');
var config = require('./../bin/config');
var app = require('./../app');

router.get('/', function(req, res) {
        res.render('order', {});
});

router.post('/', function(req,res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req, function(err, fields, files) {
        if(err) throw err;

        var mailType = '';
        var mailSettings = {};

        if (req.query.type === 'simple'){
            mailType = 'emailTemplates/simpleOrderEmail';
            mailSettings = {
                to: config.get('questionEmail'), // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Заказ с сайта', // REQUIRED.
                mailData: fields
            }
        } else {
            mailType = 'emailTemplates/contractEmail';
            mailSettings = {
                to: config.get('questionEmail'), // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Информация для договора с сайта', // REQUIRED.
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
