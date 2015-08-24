"use strict";

var slice = require("sliced");

function compare(op) {
    return function cmp(a, b) {
        if (op == "eq") return a == b;
        if (op == "gt") return a > b;
        if (op == "lt") return a < b;
        if (op == "re" && a instanceof RegExp)
            return a.test(b);

        return false;
    };
}

function not(fn) {
    return function not() {
        return !fn.apply(null, arguments);
    };
}

function wrap(a, b, comparator) {
    if (arguments.length === 3)
        return comparator(a, b);

    return function(value) {
        return b(a, value);
    };
}

module.exports.eq = function eq(a, b) {
    return wrap.apply(null, slice(arguments).concat(compare("eq")));
};

module.exports.ne = function ne(a, b) {
    return wrap.apply(null, slice(arguments).concat(not(compare("eq"))));
};

module.exports.lt = function lt(a, b) {
    return wrap.apply(null, slice(arguments).concat(compare("lt")));
};

module.exports.gt = function gt(a, b) {
    return wrap.apply(null, slice(arguments).concat(compare("gt")));
};

module.exports.like = function like(a, b) {
    return wrap.apply(null, slice(arguments).concat(compare("re")));
};

module.exports.unlike = function unlike(a, b) {
    return wrap.apply(null, slice(arguments).concat(not(compare("re"))));
};
