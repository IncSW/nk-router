'use strict';

var url = require('url');

class Router {
    
    constructor() {
        this.routes = new Map();
    }
    
    /**
     * 
     * @param {String} key
     * @param {Route} route
     * @return {Router}
     */
    add(key, route) {
        if (this.routes.has(key)) {
            throw 'Route key "' + key + '" already exists';
        }
        this.routes.set(key, route);
        return this;
    }
    
    /**
     * 
     * @param {String} method
     * @param {String} url
     * @return {Object|null}
     */
    match(method, url) {
        var route,
            data,
            key;
        
        for (key of this.routes.keys()) {
            route = this.routes.get(key);
            data = route.match(method, url);
            if (data !== null) {
                return {
                    route,
                    data
                };
            }
        }
        return null;
    }
    
    /**
     * 
     * @param {ClientRequest} request
     * @return {Object|null}
     */
    matchRequest(request) {
        return this.match(request.method, url.parse(request.url).pathname);
    }
}

module.exports = Router;