const _ = require("lodash");

function setAttribute(node, property, value) {
  if (typeof value === "string" && value === "") {
    value = null;
  }

  if (attr.onAttr[property]) {
    attr.onAttr[property].call(node, value);
  } else if (["tabIndex", "tabindex"].indexOf(property) > -1) {
    node.attributes["tabIndex"] = value;
  } else if (property.slice(0, 4) === "data") {
    node.attributes[_.kebabCase(property)] = value;
  } else if (property === "class" || property === "className") {
    node.attributes.className = (
      Array.isArray(value)
        ? [].concat(value.map(a => a.split(" ")))
        : typeof value === "string"
          ? value.split(" ")
          : []
    );
  } else if (property === "style") {
    node.style(value);
  } else {
    node.attributes[property] = value;
  }
}

function setAttrObject(node, props) {
  for (var k in props) {
    if (k.slice(0, 4) === "once") {
      node.once(k.slice(4), props[k]);
    } else if (k.slice(0, 2) === "on") {
      node.on(k.slice(2), props[k]);
    } else {
      setAttribute(node, k, props[k]);
    }
  }
}

function getAttribute(node, property) {
  if (property === "class") {
    return node.attributes.className.join(" ");
  }
  return node.attributes[property];
}

function attr(x, y) {
  if (typeof x === "object") {
    setAttrObject(this, x);
    return this;
  } else if (typeof x === "string" && typeof y !== "undefined") {
    setAttribute(this, x, y);
    return this;
  } else if (typeof x === "string") {
    return getAttribute(this, x);
  }
  return this.attributes;
}

attr.onAttr    = {};
module.exports = attr;
