var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ index:  String,
    city: String,
    price:  Array,
    pricePerKilometer: Array
});

exports.CityCargoPrices = mongoose.model('cityCargoPrices', schema);