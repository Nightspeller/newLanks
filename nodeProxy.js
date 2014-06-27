var http = require('http');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();

var options = {
    'logist36.ru': 'http://127.0.0.1:3000',
    'new.lanks.net': 'http://127.0.0.1:4000',
    target: {
        protocol: 'http:'
    }
};

http.createServer(function(req, res) {
    console.log(req.headers.host);

    if (req.path === 'forbidden') {
        console.log('forbidden is here!', req);
        return res.end('nope');
    }

    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(80);