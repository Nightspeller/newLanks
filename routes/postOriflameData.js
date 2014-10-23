var express = require('express');
/*var Departments = require('../modelsDB/departments').Departments;
var OriflameOrders = require('../modelsDB/oriflameOrders').OriflameOrders;*/

var qs = require('querystring');
var util = require('util');
var fs = require('fs');

var router = express.Router();


router.post('/',function(req, res){
        var body = '';
        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            //var post = qs.parse(body);
            fs.appendFile("postOriLog.txt", body+'\n', function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });

            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Received \n');
            res.end(util.inspect({data: body}));
        });
       /* var json1 = XLSX.utils.sheet_to_json (workbook.Sheets[sheetName]);
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
        res.end(util.inspect({workbook: json1}));*/
});

module.exports = router;
