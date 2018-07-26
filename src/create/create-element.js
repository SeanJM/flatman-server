const El = require("../class/el");
const Component = require("../class/component");
const { isDomNode } = require("../predicates");

const createComponent = require("./create-component");

function createElement() {
  const args = ["div", {}, []];
  const n = arguments.length;
  let i = -1;

  while (++i < n) {
    if ((typeof arguments[i] === "string" && i === 0) || typeof arguments[i] === "function") {
      args[0] = arguments[i];
    } else if (Array.isArray(arguments[i])) {
      args[2] = args[2].concat(arguments[i]);
    } else if (isDomNode(arguments[i]) || typeof arguments[i] === "string") {
      args[2].push(arguments[i]);
    } else if (typeof arguments[i] === "object" && arguments[i] != null) {
      args[1] = arguments[i];
    }
  }

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