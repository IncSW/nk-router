'use strict';

var Router = require('./router'),
    Route = require('./route'),
    methods = require('./methods');

module.exports = {
    Router: Router,
    router: function() {
        return new Router();
    },
    Route: Route,
    route: function(method, path, handler) {
        return new Route(method, path, handler);
    },
    methods: methods
};