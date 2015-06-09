'use strict';

var http = require('http'),
    nkRouter = require('../lib'),
    router = nkRouter.router();

router.add('base', nkRouter.route('GET', '/', function(request, response, data) {
    response.end('base');
})).add('with-parameter', nkRouter.route('GET', '/with-parameter/:parameter', function(request, response, data) {
    response.end('with-parameter: ' + data.get('parameter'));
})).add('with-integer-parameter', nkRouter.route('GET', '/with-integer-parameter/:intParameter:integer', function(request, response, data) {
    response.end('with-integer-parameter: ' + data.get('intParameter'));
}));

http.createServer(function(request, response) {
    var matched = router.matchRequest(request);
    
    if (matched === null) {
        response.statusCode = 404;
        response.end('404 Not Found');
        return;
    }
    matched.route.handler(request, response, matched.data);
}).listen(8888);