"use strict";

var test = require("tape");
var eq = require("../index").eq;
var ne = require("../index").ne;

test("eq should equal", function(assert){
    assert.ok(eq(1, 1), "one is equal to one");
    assert.ok(eq(1, "1"), "one is equal to one");
    assert.equal(eq(1, 2), false, "one is not equal to two");
    
    assert.ok( eq(1) instanceof Function, "returns a function for one arg");
    
    assert.ok( [1, "1"].every(eq(1)), "funtional works");
    assert.ok( [1, 2, 3].some(eq(1)), "functional works: some");
    assert.deepEqual( [1,2,3, "1", null, undefined ].filter(eq(1)), [1, "1"], "functional works: filter")

    assert.end();
});

test("ne should not equal", function(assert){
    assert.ok(ne(1, 2), "one is not equal to two");

    assert.ok( ne(1) instanceof Function, "returns a function for one arg");
    
    var check = ne(1);

    assert.equal( check(1), false );
    assert.equal( check(2), true );

    assert.equal( [2, 3].every(ne(99)), true, "<< check");
    assert.equal( [1, "1"].every(ne(1)), false, "<< check");


    assert.ok( [1, 2, 3].some(ne(1)), "functional works: some");
    assert.deepEqual( [1,2,3, "1", null, undefined ].filter(ne(1)), [2, 3, null, undefined ], "functional works: filter")

    assert.end();
});