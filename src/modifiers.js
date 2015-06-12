'use strict';

var modifiers = new Map(),
    keys = [],
    key;

modifiers.set('string', {
    typecast: function(value) {
        return value + '';
    },
    format: '[^\/]+'
});

modifiers.set('integer', {
    typecast: function(value) {
        return parseInt(value);
    },
    format: '[0-9]+'
});

modifiers.set('float', {
    typecast: function(value) {
        return parseFloat(value);
    },
    format: '[0-9]+\.?[0-9]*'
});

// [...modifiers.keys()]
for (key of modifiers.keys()) {
    keys.push(key);
}

module.exports = {
    list: modifiers,
    base: 'string',
    keys: keys
};