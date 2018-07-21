import El from "@class/el";
import Component from "@class/component";
import { createComponent } from "@tools";

function el(a, b, c) {
  const args = [];

  args[0] = typeof a === "function"
    ? a
    : typeof a === "string"
      ? a
      : "div";

  args[1] = !Array.isArray(a) && typeof a === "object"
    ? a
    : !Array.isArray(b) && typeof b === "object"
      ? b
      : {};

  args[2] = Array.isArray(a)
    ? a
    : Array.isArray(b)
      ? b
      : Array.isArray(c)
        ? c
        : [];

  if (typeof a === "function") {
    return createComponent(args[0], args[1], args[2]);
  }

  return new El(args[0], args[1], args[2]);
}

el.onAttr = function (name, callback) {
  El.prototype.attr.onAttr[name.toLowerCase()] = callback;
  return el;
};

el.defaultProps = function (props) {
  Object.assign(Component.__defaultProps, props);
  return el;
};

el.onCreate = function (callback) {
  El.__onCreate.push(callback);
};

el.isComponent = function (name) {
  return !!Component.lib[name];
};

el.fn = function (name, callback) {
  El.prototype[name] = callback;
  Component.prototype[name] = Component.__extend(name);

  for (var k in Component.lib) {
    if (!Component.lib[k].prototype[name]) {
      Component.lib[k].prototype[name] = Component.prototype[name];
    }
  }
};

el.create = Component.create;
export { el };