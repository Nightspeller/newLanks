var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({
    collectionPoint:  String,
    clientType: String,
    contractNumber: String,
    name: String,
    invoiceNumber:  String,
    orderDate:  String,
    address: String,
    phone: String,
    boxes: String,
    weight: String,
    invoiceAmount:  String,
    checkAmount: String,
    deliveryDate: String,
    deliveryTime: String,
    payment: String,
    status: String
});

exports.OriflameOrders = mongoose.model('oriflameOrder', schema);