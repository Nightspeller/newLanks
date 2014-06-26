var http = require('http');
var httpProxy = require('http-proxy');

httpProxy.createServer({
    hostnameOnly: true,
    router: {
        'www.logist36.ru': '127.0.0.1:3001',
        'www.new.lanks.net' : '127.0.0.1:3002'
    }
}).listen(80);
