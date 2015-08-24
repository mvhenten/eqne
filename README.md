# eqne
equal/not equal - functional pendants for javascript's === operator.

## Install

```bash
    npm install
```

## Usage

This library brings you functional versions of some useful javascript comparison operators,
so  you can write nifty stuff like this:

```javascript
if( [1,2,3].all(eq(1)) )
    console.log("They are all the same");
    
if( values.some(unlike(/\w+/) )
    console.log("The input contains some invalid chars!");
    
if( stuff.every(lt(100)) )
    console.log("Good health! all your values are below the treshold!);

```

## functions

There's [test](./test/index.js)

```javascript
    var compare = require("eqne"),
        eq = compare.eq,
        ne = compare.ne,
        lt = compare.lt,
        gt = compare.gt,
        like = compare.like,
        unlie = cmpare.unlike;

    // eq is non-strict equals ==
    assert.ok(eq(1, 1), "1 == 1");
    assert.ok([1,2,3].some(eq(1)), "some values are 1");

    // me is non-strict non-equals !=
    assert.ok(ne(1, 2), "1 != 2");
    assert.ok([1,2,3].every(ne(3))), "no fives!");

    // and additionally
    assert.ok( like(/\d+/, 123) );
    assert.ok( unlike(/\w+/, 123 );
    assert.ok( lt(100, 2) );
    assert.ok( gt(2, 100) );
```

