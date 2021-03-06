'use strict';

var methods = require('./methods'),
    {list: modifiers, base: baseModifier} = require('./modifiers'),
    expression = new RegExp('(?!/):([A-Za-z]+)(?::(' + Object.keys(modifiers).join('|') + '))?(?=/|$)', 'g');

class Route {
    
    /**
     * 
     * @param {String} method
     * @param {String} path
     * @param {Function} handler
     * @throws Will throw when method is unknown
     */
    constructor(method, path, handler) {
        if (!methods.has(method)) {
            throw new Error('invalid route method');
        }
        if (typeof path !== 'string') {
            throw new Error('path must be a string');
        }
        if (typeof handler !== 'function') {
            throw new Error('handler must be a function');
        }
        var self = this;
        
        this.handler = handler;
        this.method = method;
        this.path = path;
        this.parameters = [];
        this.pattern = new RegExp('^' + path.replace(expression, function(pattern, name, modifier) {
            modifier = modifiers[modifier] ? modifier : baseModifier;
            self.parameters.push({
                name: name,
                pattern: pattern,
                modifier: modifier
            });
            return '(' + modifiers[modifier].format + ')';
        }) + '$');
        this.hasParameters = !!this.parameters.length;
    }
    
    /**
     * 
     * @param {String} method
     * @param {String} url
     * @return {Map|null}
     */
    match(method, url) {
        if (this.method !== method) {
            return null;
        }
        if (typeof url !== 'string') {
            throw new Error('url must be a string');
        }
        if (!this.hasParameters) {
            return this.path === url ? new Map() : null;
        }
        var matches = url.match(this.pattern),
            data,
            i;

        if (matches === null) {
            return null;
        }
        matches.shift();
        data = new Map();
        i = matches.length;
        while (i--) {
           data.set(this.parameters[i].name, modifiers[this.parameters[i].modifier].typecast(matches[i]));
        }
        return data;
    }
    
    /**
     * 
     * @param {Object} parameters
     * @return {String|null}
     */
    getUrl(parameters) {
        if (!this.hasParameters) {
            return this.path;
        }
        var i = this.parameters.length,
            url = this.path;
        
        // parameters as Map is depricated
        if (parameters instanceof Map) {
            var temp = Object.create(null),
                key;
            
            for (key of parameters.keys()) {
                temp[key] = parameters.get(key);
            }
            parameters = temp;
        }
        
        parameters = parameters || {};
        while (i--) {
            if (!parameters || !parameters[this.parameters[i].name]) {
                return null;
            }
            url = url.replace(this.parameters[i].pattern, parameters[this.parameters[i].name]);
        }
        return url;
    }
}

module.exports = Route;