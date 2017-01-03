const DomNode = require('./DomNode');

class Component {}

function facade(fn) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }
    return fn.apply(this, arguments) || this;
  };
}

for (var k in DomNode.prototype) {
  if (typeof Component.prototype[k] === 'undefined') {
    Component.prototype[k] = facade(DomNode.prototype[k]);
  }
}

module.exports = Component;
