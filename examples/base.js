'use strict';

var nkRouter = require('nk-router'),
    router = nkRouter.router(),
    matched;

router.add('base', nkRouter.route('GET', '/', function() {
    console.log('base');
})).add('with-parameter', nkRouter.route('GET', '/with-parameter/:parameter', function(data) {
    console.log('with-parameter:', data.get('parameter'));
})).add('with-integer-parameter', nkRouter.route('GET', '/with-integer-parameter/:intParameter:integer', function(data) {
    console.log('with-integer-parameter:', data.get('intParameter'));
})).add('with-two-parameters', nkRouter.route('GET', '/with-two-parameters/:first/:second', function(data) {
    console.log('with-two-parameters:', data.get('first'), data.get('second'));
}));

console.log('GET', '/');
matched = router.match('GET', '/');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler(matched.data);   
}

console.log('GET', '/with-parameter/foo');
matched = router.match('GET', '/with-parameter/foo');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler(matched.data);   
}

console.log('GET', '/with-integer-parameter/bar');
matched = router.match('GET', '/with-integer-parameter/bar');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler(matched.data);   
}

console.log('GET', '/with-integer-parameter/123');
matched = router.match('GET', '/with-integer-parameter/123');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler(matched.data);   
}

console.log('GET', '/with-two-parameters/foo/bar');
matched = router.match('GET', '/with-two-parameters/foo/bar');
if (matched === null) {
    console.log('404 Not Found');
} else {
    matched.route.handler(matched.data);   
}