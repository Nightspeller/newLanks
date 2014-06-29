var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();

var options = {
    'new.lanks.net': 'http://127.0.0.1:4000',
    'www.new.lanks.net': 'http://127.0.0.1:4000'
};

http.createServer(function(req, res) {
    var target = 'http://127.0.0.1:3000';
    if (options[req.headers.host]) target = options[req.headers.host];
    proxy.web(req, res, {
        target: target
    });
}).listen(80);