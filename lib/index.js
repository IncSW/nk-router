'use strict';

var Router = require('./router'),
    Route = require('./route'),
    methods = require('./methods');

module.exports = {
    Router: Router,
    Route: Route,
    methods: methods,
    
    /**
     * 
     * @return {Router}
     */
    router: function() {
        return new Router();
    },
    
    /**
     * 
     * @param {String} method
     * @param {String} path
     * @param {Function} handler
     * @return {Route}
     */
    route: function(method, path, handler) {
        return new Route(method, path, handler);
    }
};