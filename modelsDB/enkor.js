var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ index:  String,
    city: String,
    edge: String,
    distance: String,
    category1:  String,
    category2:  String,
    category3:  String,
    minPrice:  String,
    category5:  String,
    category6:  String,
    category7:  String,
    wholeCar:  String
});

exports.Enkor = mongoose.model('enkor', schema);