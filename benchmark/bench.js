var Benchmark = require('benchmark'),
    nkRouter = require('../lib'),
    suite = new Benchmark.Suite,
    router = nkRouter.router();
    
router.add('main', nkRouter.route('GET', '/', function() {}));
router.add('all', nkRouter.route('GET', '/all', function() {}));
router.add('search', nkRouter.route('GET', '/search', function() {}));
router.add('hub', nkRouter.route('GET', '/hub/:name', function() {}));
router.add('post', nkRouter.route('GET', '/post/:id:integer', function() {}));
router.add('user', nkRouter.route('GET', '/users/:name', function() {}));

console.log(`Routes:
main   GET /
all    GET /all
search GET /search
hub    GET /hub/:name
post   GET /post/:id:integer
user   GET /users/:name
`);

suite.add('main', function() {
    router.match('GET', '/');
}).add('all', function() {
    router.match('GET', '/all');
}).add('search', function() {
    router.match('GET', '/search');
}).add('hub', function() {
    router.match('GET', '/hub/programming');
}).add('post', function() {
    router.match('GET', '/post/260227');
}).add('user', function() {
    router.match('GET', '/users/IncorrecTSW');
}).on('cycle', function(event) {
    console.log(String(event.target));
}).run({'async': false});