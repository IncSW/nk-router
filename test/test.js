var assert = require('assert'),
    Route = require('../lib/route'),
    Router = require('../lib/router');

describe('Route', function() {
    var route = new Route('GET', '/this/is/url/:parameter', function() {});
    
    describe('#constructor', function() {
        it('should throw error when parameters are incorrect', function() {
            assert.throws(function() {
                new Route();
            }, Error);
        });
        it('should not throw error when parameters are correct', function() {
            assert.doesNotThrow(function() {
                new Route('GET', '/this/is/url/:parameter', function() {});
            }, Error);
        });
    });
    describe('#match', function() {
        it('should return null when the method or url are incorrect', function() {
            assert.equal(null, route.match('METHOD', '/this/is/url/parameter'));
            assert.equal(null, route.match('GET', '/this/is/incorrect/url'));
        });
        it('should return Map with parameters when the method and url are correct', function() {
            var data = route.match('GET', '/this/is/url/parameter');
            
            assert.equal(true, data instanceof Map);
            assert.equal('parameter', data.get('parameter'));
        });
    });
    describe('#getUrl', function() {
        it('should return null when not all parameters are set', function() {
            assert.equal(null, route.getUrl());
        });
        it('should return string when all parameters are set', function() {
            assert.equal('/this/is/url/parameter', route.getUrl(new Map([['parameter', 'parameter']])));
        });
    });
});

describe('Router', function() {
    var router;

    beforeEach(function() {
        router = new Router();
        router.add('foo', new Route('GET', '/this/is/url/:parameter', function() {}));
    });
    
    describe('#add', function() {
        it('should throw error when keys are duplicates', function() {
            assert.throws(function() {
                router.add('foo', new Route('GET', '/this/is/url/:param', function() {}));
            }, Error);
        });
        it('should not throw error when all ok', function() {
            assert.doesNotThrow(function() {
                router.add('bar', new Route('GET', '/this/is/url/:param', function() {}));
            }, Error);
        });
    });
    describe('#match', function() {
        it('should return null when the method incorrect or url not found', function() {
            assert.equal(null, router.match('METHOD', '/this/is/url/parameter'));
            assert.equal(null, router.match('GET', '/this/is/incorrect/url'));
        });
        it('should return Object with route and parameters when url was found', function() {
            var matched = router.match('GET', '/this/is/url/parameter');
            
            assert.equal('object', typeof matched);
            assert.equal(true, matched.data instanceof Map);
            assert.equal(true, matched.route instanceof Route);
        });
    });
    describe('#route', function() {
        it('should return null when route not found', function() {
            assert.equal(null, router.route('bar'));
        });
        it('should return Route when route found', function() {
            assert.equal(true, router.route('foo') instanceof Route);
        });
    });
    describe('#getUrl', function() {
        it('should return null when wout not found or not all parameters are set', function() {
            assert.equal(null, router.getUrl());
            assert.equal(null, router.getUrl('bar'));
        });
        it('should return string when all ok', function() {
            assert.equal('/this/is/url/parameter', router.getUrl('foo', new Map([['parameter', 'parameter']])));
        });
    });
});