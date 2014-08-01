
var express = require('express');
var Departments = require('../modelsDB/departments').Departments;
var OriflameOrders = require('../modelsDB/oriflameOrders').OriflameOrders;

var formidable = require('formidable');
var router = express.Router();

var XLSX = require('xlsx');
var util = require('util');
var fs = require('fs');


router.get('/', function(req, res) {
    Departments.find({}, function(err, departments){
        if(err) throw err;
        res.render('oriflameUploader', {allDepartments: departments});
    });
});

router.post('/',function(req, res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;

        var workbook = XLSX.readFile(files.register.path);

        var result = [];
        workbook.SheetNames.forEach(function(sheetName) {
            var json1 = XLSX.utils.sheet_to_json (workbook.Sheets[sheetName]);
            for (var i = 0; i < json1.length; i++) {
                var oriflameOrders = new OriflameOrders({
                    collectionPoint:  json1[i]['Пункт сбора'],
                    clientType: json1[i]['Тип клиента'],
                    contractNumber: json1[i]['Номер кон-та'],
                    name: json1[i]['ФИО'],
                    invoiceNumber:  json1[i]['Номер накладной'],
                    orderDate:  json1[i]['Дата заказа'],
                    address: json1[i]['Адрес доставки '],
                    phone: json1[i]['Контакт. телефон'],
                    boxes: json1[i]['Короб. (б/м)'],
                    weight: json1[i]['Вес'],
                    invoiceAmount:  json1[i]['Сумма накладной'],
                    checkAmount: json1[i]['Сумма чека'],
                    deliveryDate: json1[i]['Дата доставки'],
                    deliveryTime: json1[i]['Время доставки'],
                    payment: json1[i]['Оплата'],
                    status: json1[i]['Статус']
                });
                oriflameOrders.save(function(err){
                    if (err) throw err;
                });
            }
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({workbook: json1}));
        });

        fs.unlink(files.register.path, function(err){
            if (err) throw err;
        });
    });
});

module.exports = router;
