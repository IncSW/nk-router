'use strict';

var methods = require('./methods'),
    modifiers = require('./modifiers'),
    expression = new RegExp('(?!/):([A-Za-z]+)(?::(' + modifiers.keys.join('|') + '))?(?=/|$)', 'g');

class Route {
    
    constructor(method, path, handler) {
        if (!methods.has(method)) {
            throw 'Invalid route method';
        }
        var self = this;
        
        this.handler = handler;
        this.method = method;
        this.path = path;
        this.params = [];
        this.pattern = new RegExp('^' + path.replace(expression, function(pattern, name, modifier) {
            modifier = modifier || modifiers.base;
            self.params.push({
                name: name,
                pattern: pattern,
                modifier: modifier
            });
            return '(' + modifiers.list[modifier].format + ')';
        }) + '$');
    }
    
    match(method, url) {
        if (this.method !== method) {
            return null;
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
           data.set(this.params[i].name, matches[i]);
        }
        return data;
    }
}

module.exports = Route;