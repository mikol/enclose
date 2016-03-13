(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies = ['../enclose'];

function factory(enclose) {
  var key = {};

  function Example(example) {
    enclose(this, key);
    this.setExample(example);
    this.example = 'This is not the example you’re looking for.';
  }

  Example.prototype.getExample = function getExample() {
    return this.$(key).example;
  };

  Example.prototype.setExample = function setExample(example) {
    this.$(key).example = example;
  };

  var x = new Example('Hello, Example!');
  console.log(x.getExample());

  x.setExample('Goodbye, Example!');
  console.log(x.getExample());

  console.log(x);
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
