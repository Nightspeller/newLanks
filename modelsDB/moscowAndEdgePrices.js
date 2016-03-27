var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ 
    index:  String,
    category: String,
    cityPrice: String,
    zone1: String,
    zone2:  String,
    zone3:  String,
    zone4:  String
});

exports.moscowAndEdgePrices = mongoose.model('moscowAndEdgePrices', schema);