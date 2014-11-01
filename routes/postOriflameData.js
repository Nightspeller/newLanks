var express = require('express');
var OriflameOrders = require('../modelsDB/oriflameOrders').OriflameOrders;

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
            fs.appendFile("postOriLog.txt", body+'\n', function(err) {
                if(err) throw err;
            });

            var json1 = JSON.parse(body);
            for (var i = 0; i < json1.length; i++) {
                var oriflameOrders = new OriflameOrders({
                  //  collectionPoint:  json1[i]['Пункт сбора'],
                 //   clientType: json1[i]['Тип клиента'],
                    contractNumber: json1[i]['RoomConsultant'],
                    name: json1[i]['FIO'],
                    invoiceNumber:  json1[i]['InvoiceNumber'],
                    orderDate:  json1[i]['OrderDate'],
                    address: json1[i]['ShippingAddress'],
                    phone: json1[i]['Phone'],
                    boxes: json1[i]['Quantity'],
                 //   weight: json1[i]['Вес'],
                    invoiceAmount:  json1[i]['InvoiceAmount'],
                    checkAmount: json1[i]['AmountCheck'],
                    deliveryDate: json1[i]['DeliveryDate'],
                    deliveryTime: json1[i]['DeliveryTime'],
                    driver: json1[i]['Motorist'],
                    payment: json1[i]['Pay'],
                    status: json1[i]['Status']
                });
                OriflameOrders.remove({invoiceNumber:  json1[i]['InvoiceNumber']}, function(err, doc) {
                    if (err) throw err;
                    oriflameOrders.save(function(err){
                        if (err) throw err;
                    });
                });
            }

            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Received \n');
            res.end(util.inspect({data: body}));
        });
});

module.exports = router;
