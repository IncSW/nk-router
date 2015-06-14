'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var methods = require('./methods');

var _require = require('./modifiers');

var modifiers = _require.list;
var baseModifier = _require.base;
var expression = new RegExp('(?!/):([A-Za-z]+)(?::(' + Object.keys(modifiers).join('|') + '))?(?=/|$)', 'g');
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
        this.parameters = [];
        this.pattern = new RegExp('^' + path.replace(expression, function (pattern, name, modifier) {
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
    }, {
        key: 'getUrl',

        /**
         * 
         * @param {Object} parameters
         * @return {String|null}
         */
        value: function getUrl(parameters) {
            if (!this.hasParameters) {
                return this.path;
            }
            var i = this.parameters.length,
                url = this.path;

            // parameters as Map is depricated
            if (parameters instanceof Map) {
                var temp = Object.create(null),
                    key;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = parameters.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        key = _step.value;

                        temp[key] = parameters.get(key);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
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
    }]);

    return Route;
})();

module.exports = Route;