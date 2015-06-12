var Benchmark = require('benchmark'),
    nkRouter = require('../lib'),
    suite = new Benchmark.Suite,
    router = nkRouter.router();
    
router.add('base', nkRouter.route('GET', '/', function() {}));
router.add('with-parameter', nkRouter.route('GET', '/with-parameter/:id', function() {}));
router.add('with-integer-parameter', nkRouter.route('GET', '/with-integer-parameter/:id:integer', function() {}));

suite.add('base', function() {
    router.match('GET', '/');
}).add('with-parameter', function() {
    router.match('GET', '/with-parameter/parameter');
}).add('with-integer-parameter', function() {
    router.match('GET', '/with-integer-parameter/123');
}).on('cycle', function(event) {
    console.log(String(event.target));
}).run({'async': false});