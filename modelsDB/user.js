var crypto = require('crypto');

var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
 .set(function(password){
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
 })
 .get(function(){
    return this._plainPassword;
 });

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authtorize = function(username, password, callback){
    var User = this;
    User.findOne({username: username}, function(err, user){
        if (err) throw err;
        if (user){
            if(user.checkPassword(password)){
                callback(null, user);
            } else {
                callback('403');
            }
        } else {
            callback('404')
        }
    });
};

exports.User = mongoose.model('User', schema);