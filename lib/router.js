'use strict';

class Router {
    
    constructor() {
        this.routes = new Map();
    }
    
    add(key, route) {
        if (this.routes.has(key)) {
            throw 'Route key "' + key + '" already exists';
        }
        this.routes.set(key, route);
        return this;
    }
    
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
}

module.exports = Router;