'use strict';

var nkRouter = require('nk-router'),
    router = nkRouter.router(),
    route;

route = nkRouter.route('GET', '/with-parameter/:parameter', function() {});
router.add('with-parameter', route);

console.log(
    route.getUrl(new Map([['parameter', 'foobar']]))
);
console.log(
    router.getUrl('with-parameter', new Map([['parameter', 'foobar']]))
);