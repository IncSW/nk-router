'use strict';

var modifiers = {};

modifiers.string = {
    typecast: function(value) {
        return value + '';
    },
    format: '[^\/]+'
};

modifiers.integer = {
    typecast: function(value) {
        return parseInt(value);
    },
    format: '[0-9]+'
};

modifiers.float = {
    typecast: function(value) {
        return parseFloat(value);
    },
    format: '[0-9]+\.?[0-9]*'
};

module.exports = {
    list: modifiers,
    keys: Object.keys(modifiers),
    base: 'string'
};