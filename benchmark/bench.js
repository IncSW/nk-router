var Benchmark = require('benchmark'),
    nkRouter = require('../lib'),
    suite = new Benchmark.Suite(),
    router = nkRouter.router();

console.log('Routes:');
console.log('main   GET /');
router.add('main', nkRouter.route('GET', '/', function() {}));

console.log('all    GET /all');
router.add('all', nkRouter.route('GET', '/all', function() {}));

console.log('search GET /search');
router.add('search', nkRouter.route('GET', '/search', function() {}));

console.log('hub    GET /hub/:name');
router.add('hub', nkRouter.route('GET', '/hub/:name', function() {}));

console.log('post   GET /post/:id:integer');
router.add('post', nkRouter.route('GET', '/post/:id:integer', function() {}));

console.log('user   GET /users/:name');
router.add('user', nkRouter.route('GET', '/users/:name', function() {}));

console.log('\nBenchmarks:');
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
}).run({
    async: false
});