"use strict";

function equals( a, b ){
    return a == b;
}

function negate( fn ){
    return function not(){
        return !fn.apply( null, arguments );
    };
}

function wrap( a, compare ){
    return function(value){
        return compare( a, value );
    };
}

module.exports.eq = function eq( a, b ){
    if( arguments.length === 1 )
        return wrap( a, equals );
        
    return equals(a, b);
};

module.exports.ne = function ne(a, b){
    if( arguments.length === 1 )
        return wrap( a, negate( equals ) );
        
    return ! equals( a, b );
};