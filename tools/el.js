const El        = require("../class/El");
const Component = require("../class/Component");

function el(a, b, c) {
  if (Component.lib[a]) {
    return new Component.lib[a](b, c);
  } else {
    return new El(a, b, c);
  }
}

el.onAttr = function (name, callback) {
  El.__onAttr[name.toLowerCase()] = callback;
};

el.onCreate = function (callback) {
  El.__onCreate.push(callback);
};

el.fn = function (name, callback) {
  El.prototype[name]        = callback;
  Component.prototype[name] = Component.__extend(name);

  for (var k in Component.lib) {
    if (!Component.lib[k].prototype[name]) {
      Component.lib[k].prototype[name] = Component.prototype[name];
    }
  }
};

el.create      = Component.create;
module.exports = el;