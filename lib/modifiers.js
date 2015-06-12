'use strict';

var modifiers = new Map(),
    keys = [],
    key;

modifiers.set('string', {
    typecast: function typecast(value) {
        return value + '';
    },
    format: '[^/]+'
});

modifiers.set('integer', {
    typecast: function typecast(value) {
        return parseInt(value);
    },
    format: '[0-9]+'
});

modifiers.set('float', {
    typecast: function typecast(value) {
        return parseFloat(value);
    },
    format: '[0-9]+.?[0-9]*'
});

// [...modifiers.keys()]
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = modifiers.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        key = _step.value;

        keys.push(key);
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

module.exports = {
    list: modifiers,
    base: 'string',
    keys: keys
};