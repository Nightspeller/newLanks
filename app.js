var express = require('express');

var session = require('express-session');

var app = module.exports = express();

var mailer = require('express-mailer');

var MongoStore = require('connect-mongo')(session);

var config = require('./bin/config');

mailer.extend(app, {
    from: 'sidorov.serg@lanks.org',
    host: 'smtp.sweb.ru', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: config.get('emailSender')
});

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var question = require('./routes/question');
var services = require('./routes/services');
var departments = require('./routes/departments');
var calculate = require('./routes/calculate');
var order = require('./routes/order');
var online = require('./routes/online');
var news = require('./routes/news');
var editDepartment = require('./routes/editDepartment');
var login = require('./routes/login');
var simpleCalculate = require('./routes/simpleCalculate');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({'url': config.get('mongoose:uri')})
}));

app.use(require('./middleware/loadUser'));
app.use(require('./middleware/loadHeaderAndFooter'));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
app.use('/question', question);
app.use('/services', services);
app.use('/departments', departments);
app.use('/calculate', calculate);
app.use('/order', order);
app.use('/online', online);
app.use('/news', news);
app.use('/editDepartment', editDepartment);
app.use('/login', login);
app.use('/simpleCalculate', simpleCalculate);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



