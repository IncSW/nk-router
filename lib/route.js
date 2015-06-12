'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var methods = require('./methods'),
    modifiers = require('./modifiers'),
    expression = new RegExp('(?!/):([A-Za-z]+)(?::(' + modifiers.keys.join('|') + '))?(?=/|$)', 'g');

var Route = (function () {

    /**
     * 
     * @param {String} method
     * @param {String} path
     * @param {Function} handler
     * @throws Will throw when method is unknown
     */

    function Route(method, path, handler) {
        _classCallCheck(this, Route);

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
        this.params = [];
        this.pattern = new RegExp('^' + path.replace(expression, function (pattern, name, modifier) {
            modifier = modifiers.list.has(modifier) ? modifier : modifiers.base;
            self.params.push({
                name: name,
                pattern: pattern,
                modifier: modifier
            });
            return '(' + modifiers.list.get(modifier).format + ')';
        }) + '$');
    }

    _createClass(Route, [{
        key: 'match',

        /**
         * 
         * @param {String} method
         * @param {String} url
         * @return {Map|null}
         */
        value: function match(method, url) {
            if (this.method !== method) {
                return null;
            }
            if (typeof url !== 'string') {
                throw new Error('url must be a string');
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
                data.set(this.params[i].name, modifiers.list.get(this.params[i].modifier).typecast(matches[i]));
            }
            return data;
        }
    }, {
        key: 'getUrl',

        /**
         * 
         * @param {Map} parameters
         * @return {String|null}
         */
        value: function getUrl(parameters) {
            if (parameters && !(parameters instanceof Map)) {
                throw new Error('parameters must be a map or undefined');
            }
            var i = this.params.length,
                url = this.path;

            while (i--) {
                if (!parameters || !parameters.has(this.params[i].name)) {
                    return null;
                }
                url = url.replace(this.params[i].pattern, parameters.get(this.params[i].name));
            }
            return url;
        }
    }]);

    return Route;
})();

module.exports = Route;