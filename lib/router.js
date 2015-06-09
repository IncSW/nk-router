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
     * @throws Will throw when duplicate key
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
    
    /**
     * 
     * @param {String} key
     * @return {Route|null}
     */
    route(key) {
        if (!this.routes.has(key)) {
            return null;
        }
        return this.routes.get(key);
    }
    
    /**
     * 
     * @param {String} key
     * @param {Map} data
     * @return {String|null}
     */
    getUrl(key, data) {
        var route = this.route(key);
        
        if (route === null) {
            return null;
        }
        return route.getUrl(data);
    }
}

module.exports = Router;