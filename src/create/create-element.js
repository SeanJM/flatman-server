const El = require("../class/el");
const Component = require("../class/component");
const { getCreateArguments } = require("../tools");

const createComponent = require("./create-component");

function createElement(a, b, c) {
  const args = getCreateArguments(a, b, c);
  return typeof args[0] === "function"
    ? createComponent(args[0], args[1], args[2])
    : new El(args[0], args[1], args[2]);
}

createElement.onAttr = function (name, callback) {
  El.prototype.attr.onAttr[name.toLowerCase()] = callback;
  return createElement;
};

createElement.fn = function (name, callback) {
  El.prototype[name] = callback;
  Component.prototype[name] = Component.__extend(name);
};

createElement.create = Component.create;
module.exports = createElement;