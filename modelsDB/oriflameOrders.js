var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({
    //collectionPoint:  String,
   // clientType: String,
    contractNumber: String,
    name: String,
    invoiceNumber:  { type : String , unique : true, dropDups: true },
    orderDate:  String,
    address: String,
    phone: String,
    boxes: String,
  //  weight: String,
    invoiceAmount:  String,
    checkAmount: String,
    deliveryDate: String,
    deliveryTime: String,
    driver: String,
    payment: String,
    status: String
});

exports.OriflameOrders = mongoose.model('oriflameOrder', schema);