(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = 'enclose';
var dependencies = ['instance'];

function factory(instance) {
  /**
   * Create a private property-value store for `self` using `key` to control
   * access to it via a getter method (`this.$()` by default).
   *
   * @example
   * // `key`, the constructor `Example()`, and the instance methods
   * // `getExample()` and `setExample()` share a private scope. Only
   * // these functions have access to `key` so the getter method `this.$()`
   * // created by `enclose()` only permits these functions to access the
   * // property-value store.
   * var key = {};
   *
   * function Example(example) {
   *   enclose(this, key);
   *   this.setExample(example);
   * }
   *
   * type(Example).implements({
   *   getExample: function () {
   *     return this.$(key).example;
   *   },
   *
   *   setExample: function (example) {
   *     this.$(key).example = example;
   *   }
   * });
   *
   * @param {Object} self - The instance for which a private key-value store
   *     will be created.
   * @param {*} key - A unique key known only to `self`’s privileged code
   *     (typically an locally-scoped object instance `{}`).
   * @param {string=} [name='$'] - The name of the property-value store getter
   *     method that `enclose()` will define for `self`.
   */
  return function enclose(self, key, name) {
    var o = {};

    instance.prop(self, (name != null ? name : '$'), function (x) {
      return x === key && o;
    });
  };
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
