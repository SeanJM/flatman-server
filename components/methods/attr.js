const _ = require("lodash");

function setAttrObject(node, props) {
  for (var k in props) {
    if (k.slice(0, 4) === "once") {
      node.once(k.slice(4), props[k]);
    } else if (k.slice(0, 2) === "on") {
      node.on(k.slice(2), props[k]);
    } else if (k === "className") {
      node.attr("className", props[k]);
    } else if (k === "id") {
      node.attr("id", props[k]);
    }
  }
}

function getClassName(value) {
  var array = Array.isArray(value) ? value : value.split(" ");
  var result = [];
  var temp;
  for (var i = 0, n = array.length; i < n; i++) {
    temp = array[i] && array[i].trim();
    if (temp) { result.push(temp); }
  }
  return result;
}

function setAttribute(node, property, value) {
  if (typeof value === "string" && value === "") {
    value = null;
  }

  if (["tabIndex", "tabindex"].indexOf(property) > -1) {
    node.attributes["tabIndex"] = value;
  } else if (property.slice(0, 4) === "data") {
    node.attributes[_.kebabCase(property)] = value;
  } else if (property === "className" || property === "class") {
    node.attributes.className = getClassName(value);
  } else if (property === "style") {
    if (typeof value === "string") {
      throw new Error("Invalid value of \"" + value.substr(0, 30) + "\", style must be passed an object as an argument and not a string.");
    }
    node.style(value);
  } else {
    node.attributes[property] = value;
  }
}

function getAttribute(node, property) {
  if (property === "class" || property === "className") {
    return node.attributes.className.join(" ");
  }
  return node.attributes[property];
}

module.exports = function attr(property, value) {
  if (typeof property === "object") {
    setAttrObject(this, property);
    return this;
  } else if (typeof property === "string" && typeof value !== "undefined") {
    setAttribute(this, property, value);
    return this;
  } else if (typeof property === "string") {
    return getAttribute(this, property);
  }
  return this.attributes;
};
