'use strict';

var url = require('url');

class Router {
    
    constructor() {
        this.routes = Object.create(null);
    }
    
    /**
     * 
     * @param {String} key
     * @param {Route} route
     * @return {Router}
     * @throws Will throw when duplicate key
     */
    add(key, route) {
        if (this.routes[key]) {
            throw new Error('route key "' + key + '" already exists');
        }
        this.routes[key] = route;
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
        
        for (key in this.routes) {
            route = this.routes[key];
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
    
    /**
     * 
     * @param {String} key
     * @return {Route|null}
     */
    route(key) {
        if (typeof key !== 'string' || !this.routes[key]) {
            return null;
        }
        return this.routes[key];
    }
    
    /**
     * 
     * @param {String} key
     * @param {Object} parameters
     * @return {String|null}
     */
    getUrl(key, parameters) {
        var route = this.route(key);
        
        if (route === null) {
            return null;
        }
        return route.getUrl(parameters);
    }
}

module.exports = Router;