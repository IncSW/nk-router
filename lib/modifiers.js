'use strict';

//Object.create(null)
var modifiers = new Map();

modifiers['string'] = {
    typecast: function typecast(value) {
        return value;
    },
    format: '[^/]+'
};

modifiers['integer'] = {
    typecast: function typecast(value) {
        return parseInt(value);
    },
    format: '[0-9]+'
};

modifiers['float'] = {
    typecast: function typecast(value) {
        return parseFloat(value);
    },
    format: '[0-9]+.?[0-9]*'
};

module.exports = {
    list: modifiers,
    base: 'string'
};