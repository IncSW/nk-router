var assert = require('assert'),
    Route = require('../lib/route');

describe('Route', function() {

    describe('constructor()', function() {
        it('should not throw error when all parameters are correct', function() {
            assert.doesNotThrow(function() {
                new Route('GET', '/', function() {});
            }, Error);
            assert.doesNotThrow(function() {
                new Route('DELETE', '/post/:id', function() {});
            }, Error);
            assert.doesNotThrow(function() {
                new Route('POST', '/post/:id/:status:integer', function() {});
            }, Error);
        });
        it('should throw error when at least one of parameters is incorrect', function() {
            assert.throws(function() {
                new Route();
            }, Error);
            assert.throws(function() {
                new Route('INVALID_METHOD', '/', function() {});
            }, Error);
        });
    });
    
    describe('#match', function() {
        var route = new Route('POST', '/post/:id/:status:integer', function() {});
        
        it('should return Map with parameters when url matched', function() {
            var data = route.match('POST', '/post/1/2');

            assert.strictEqual(true, data instanceof Map);
            assert.strictEqual('1', data.get('id'));
            assert.strictEqual(2, data.get('status'));
        });
        it('should return null when the method or url are incorrect', function() {
            assert.strictEqual(null, route.match('METHOD', '/this/is/url/parameter'));
            assert.strictEqual(null, route.match('GET', '/this/is/incorrect/url'));
        });
    });

    describe('#getUrl', function() {
        var route = new Route('POST', '/post/:id/:status:integer', function() {});
        
        it('should return string when all parameters are set', function() {
            assert.strictEqual('/post/1/2', route.getUrl({
                id: 1,
                status: 2
            }));
        });
        it('should return null when not all parameters are set', function() {
            assert.strictEqual(null, route.getUrl());
        });
    });
});