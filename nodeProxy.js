var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();

var options = {
    'logist36.ru': '127.0.0.1:3000',
    'new.lanks.net': '127.0.0.1:4000'
};

http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(80);