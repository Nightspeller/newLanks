var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ index:  String,
    city: String,
    cityEng: String,
    emblem: String,
    address:  String,
    email:  String,
    mainPhone: String,
    additionalPhone: String,
    fax: String,
    skype: String,
    stockAddress:  String,
    coordinates: String,
    mapID: String,
    satellites: Array
});

exports.Departments = mongoose.model('department', schema);