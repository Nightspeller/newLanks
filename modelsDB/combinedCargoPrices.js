var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ index:  String,
    cityFrom: String,
    cityTo: String,
    minimum: String,
    category1:  String,
    category2:  String,
    category3:  String,
    category4:  String,
    category5:  String,
    category6:  String,
    category7:  String,
    category8:  String,
    category9:  String
});

exports.CombinedCargoPrices = mongoose.model('combinedCargoPrices', schema);