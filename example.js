(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies = ['./enclose'];

function factory(enclose) {
  var Example;

  (function () {
    var key = {};

    Example = function Example(example) {
      enclose(this, key);
      this.setExample(example);
      this.example = 'This is not the example you’re looking for.';
    };

    Example.prototype.getExample = function getExample() {
      return this.$(key).example;
    };

    Example.prototype.setExample = function setExample(example) {
      this.$(key).example = example;
    };

  }());

  var okay = true;
  var x = new Example('Hello, Example!');
  if (x.getExample() === 'Hello, Example!') {
    console.log('pass: Hello, Example!');
  } else {
    console.log('FAIL: Hello, Example!');
    okay = false;
  }

  x.setExample('Goodbye, Example!');
  if (x.getExample() === 'Goodbye, Example!') {
    console.log('pass: Goodbye, Example!');
  } else {
    console.log('FAIL: Goodbye, Example!');
    okay = false;
  }

  if (x.example !== 'Goodbye, Example!') {
    console.log('pass: This is not the example you’re looking for.');
  } else {
    console.log('FAIL: This is not the example you’re looking for.');
    okay = false;
  }

  if (typeof key === 'undefined' && x.$({}).example === undefined) {
    console.log('pass: Cannot access `key` or property-value store.');
  } else {
    console.log('FAIL: Cannot access `key` or property-value store.');
    okay = false;
  }

  try {
    console.log(delete x.$);
    console.log('Maybe your runtime does not support property descriptors.');
  } catch (e) {
    console.log("'" + e.message + "'.");
    console.log('Your runtime supports property descriptors.');
  }

  if (!okay && process && typeof process.exit === 'function') {
    process.exit(1);
  }
}

// -----------------------------------------------------------------------------
var n = dependencies.length;
var o = 'object';
var r = /([^-_\s])[-_\s]+([^-_\s])/g;
function s(m, a, b) { return a + b.toUpperCase(); }
context = typeof global === o ? global : typeof window === o ? window : context;
if (typeof define === 'function' && define.amd) {
  define(dependencies, function () {
    return factory.apply(context, [].slice.call(arguments));
  });
} else if (typeof module === o && module.exports) {
  for (; n--;) { dependencies[n] = require(dependencies[n]); }
  module.exports = factory.apply(context, dependencies);
} else {
  for (; n--;) { dependencies[n] = context[dependencies[n]]; }
  context[id.replace(r, s)] = factory.apply(context, dependencies);
}
}(this));
