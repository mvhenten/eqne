"use strict";

var test = require("tape");
var format = require("util").format;
var eq = require("../index").eq;
var ne = require("../index").ne;
var gt = require("../index").gt;
var lt = require("../index").lt;
var like = require("../index").like;
var unlike = require("../index").unlike;

test("eq should equal", function(assert){
    assert.ok(eq(1, 1), "one is equal to one");
    assert.ok(eq(1, "1"), "one is equal to one");
    assert.equal(eq(1, 2), false, "one is not equal to two");
    
    assert.ok( eq(1) instanceof Function, "returns a function for one arg");
    
    assert.ok( [1, "1"].every(eq(1)), "funtional works");
    assert.ok( [1, 2, 3].some(eq(1)), "functional works: some");
    assert.deepEqual( [1,2,3, "1", null, undefined ].filter(eq(1)), [1, "1"], "functional works: filter");

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
    assert.deepEqual( [1,2,3, "1", null, undefined ].filter(ne(1)), [2, 3, null, undefined ], "functional works: filter");

    assert.end();
});

test("gt should match 'greater then'", function(assert){
    assert.ok(gt(2, 1), "two is > one");

    assert.ok( gt(1) instanceof Function, "returns a function for one arg");
    
    var greater = 2;
    var check = gt(greater);
    
    [1, 2, 3, undefined, null, false, {}, [], "1", "2", "3", "a", "z"].forEach(function(value){
        assert.equal( check(value), value < greater, format("%s < %s == ", value, greater, value < greater ));    
    });

    assert.end();
});

test("lt should match 'lower then'", function(assert){
    assert.ok(lt(1, 2), "two is > one");

    assert.ok( lt(1) instanceof Function, "returns a function for one arg");
    
    var greater = 2;
    var check = gt(greater);
    
    [1, 2, 3, undefined, null, false, {}, [], "1", "2", "3", "a", "z"].forEach(function(value){
        assert.equal( check(value), value < greater, format("%s < %s == ", greater, value, greater < value ));    
    });

    assert.end();
});

test("like should match regex stuff", function(assert){
    
    assert.ok( like(/\d+/, 1), "1 matches \\d+");
    assert.ok( like(/\d+/, "we are talking regex here 123"), "string with 123 matches \\d+");
    
    var re = /\w+/, check = like(re);
    
    [1, 2, 3, undefined, null, false, {}, [], "1", "2", "3", "a", "z"].forEach(function(value){
        assert.equal( check(value), re.test(value), format("%s =~ %s == ", value, re, re.test(value)));    
    });

    assert.end();
});

test("unlike should not invert match regexes", function(assert){
    var re = /^\d+$/;
    
    ["aaa", [], {}, undefined, null].forEach(function(value){
        assert.ok( unlike(/^\d+$/, value), format("%s !~ %s =>", value, re, !re.test(value)));
    });
    
    ["123", 123, 1e10].forEach(function(value){
       assert.ok( !unlike(/^\d+$/, value), format("%s !~ %s =>", value, re, re.test(value)));
    });

    assert.end();
});