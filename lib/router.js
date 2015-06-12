'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var url = require('url');

var Router = (function () {
    function Router() {
        _classCallCheck(this, Router);

        this.routes = new Map();
    }

    _createClass(Router, [{
        key: 'add',

        /**
         * 
         * @param {String} key
         * @param {Route} route
         * @return {Router}
         * @throws Will throw when duplicate key
         */
        value: function add(key, route) {
            if (this.routes.has(key)) {
                throw new Error('route key "' + key + '" already exists');
            }
            this.routes.set(key, route);
            return this;
        }
    }, {
        key: 'match',

        /**
         * 
         * @param {String} method
         * @param {String} url
         * @return {Object|null}
         */
        value: function match(method, url) {
            var route, data, key;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.routes.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    key = _step.value;

                    route = this.routes.get(key);
                    data = route.match(method, url);
                    if (data !== null) {
                        return {
                            route: route,
                            data: data
                        };
                    }
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

            return null;
        }
    }, {
        key: 'matchRequest',

        /**
         * 
         * @param {ClientRequest} request
         * @return {Object|null}
         */
        value: function matchRequest(request) {
            return this.match(request.method, url.parse(request.url).pathname);
        }
    }, {
        key: 'route',

        /**
         * 
         * @param {String} key
         * @return {Route|null}
         */
        value: function route(key) {
            if (typeof key !== 'string' || !this.routes.has(key)) {
                return null;
            }
            return this.routes.get(key);
        }
    }, {
        key: 'getUrl',

        /**
         * 
         * @param {String} key
         * @param {Map} parameters
         * @return {String|null}
         */
        value: function getUrl(key, parameters) {
            var route = this.route(key);

            if (route === null) {
                return null;
            }
            return route.getUrl(parameters);
        }
    }]);

    return Router;
})();

module.exports = Router;