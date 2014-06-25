var http = require('http');
var httpProxy = require('http-proxy');

httpProxy.createServer({
    hostnameOnly: true,
    router: {
        'www.my-domain.com': '127.0.0.1:3001',
        'www.my-other-domain.de' : '127.0.0.1:3002'
    }
}).listen(80);
