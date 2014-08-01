
var express = require('express');
var router = express.Router();

var OriflameOrders = require('../modelsDB/oriflameOrders').OriflameOrders;

router.get('/', function(req, res) {
  res.render('online', { });
});

router.get('/oriflame', function(req, res) {
    if (req.query.invoice){
        OriflameOrders.find({invoiceNumber: req.query.invoice}, function(err, order){
            if(err) throw err;
            res.send(order);
        });
    }
});

module.exports = router;
