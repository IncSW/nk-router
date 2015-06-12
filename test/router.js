var assert = require('assert'),
    Route = require('../lib/route'),
    Router = require('../lib/router');

describe('Router', function() {
    var router;

    beforeEach(function() {
        router = new Router();
        router.add('foo', new Route('GET', '/', function() {}));
    });
    
    describe('#add', function() {
        it('should not throw error when all ok', function() {
            assert.doesNotThrow(function() {
                router.add('bar', new Route('GET', '/', function() {}));
            }, Error);
        });
        it('should throw error when keys are duplicates', function() {
            assert.throws(function() {
                router.add('foo', new Route('GET', '/', function() {}));
            }, Error);
        });
    });
    
    describe('#match', function() {
        it('should return Object with route and parameters when url was found', function() {
            var matched = router.match('GET', '/');
            
            assert.strictEqual('object', typeof matched);
            assert.strictEqual(true, matched.data instanceof Map);
            assert.strictEqual(true, matched.route instanceof Route);
        });
        it('should return null when the method incorrect or url not found', function() {
            assert.strictEqual(null, router.match('METHOD', '/'));
            assert.strictEqual(null, router.match('GET', '/foo'));
        });
    });
    
    describe('#route', function() {
        it('should return null when route not found', function() {
            assert.strictEqual(null, router.route('bar'));
        });
        it('should return Route when route found', function() {
            assert.strictEqual(true, router.route('foo') instanceof Route);
        });
    });
    
    describe('#getUrl', function() {
        it('should return string when all ok', function() {
            assert.strictEqual('/', router.getUrl('foo'));
        });
        it('should return null when rout not found or not all parameters are set', function() {
            assert.strictEqual(null, router.getUrl());
            assert.strictEqual(null, router.getUrl('bar'));
        });
    });
});