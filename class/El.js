const isObject  = require("../predicates/isObject");
const parseHtml = require("flatman-parse");
const Bus       = require("./Bus");

function parseEach(element) {
  if (typeof element === "string") {
    return element.trim();
  }

  if (element.childNodes && element.childNodes.length) {
    return new El(element.tagName, element.attributes, element.childNodes.map(parseEach));
  }

  return new El(element.tagName, element.attributes);
}

function parse(string) {
  const parsed = parseHtml(string).map(parseEach);
  return new El("root", parsed);
}

function El() {
  const a        = [ arguments[0], arguments[1], arguments[2] ];
  let tagName    = "div";
  let childNodes = [];
  let props      = {};

  if (typeof a[0] === "string") {
    tagName = a[0];
  } else if (Array.isArray(a[0])) {
    childNodes = a[0];
  } else if (isObject(a[0])) {
    props = a[0];
  }

  if (Array.isArray(a[1])) {
    childNodes = a[1];
  } else if (isObject(a[1])) {
    props = a[1];
  }

  if (Array.isArray(a[2])) {
    childNodes = a[2];
  }

  this.attributes = {
    style     : {},
    className : [],
    disabled  : null,
    name      : null,
  };

  this.ref         = props.ref;
  this.refs        = {};
  this.tagName     = tagName;
  this.node        = this;
  this.bus         = new Bus({ target : this });
  this.subscribers = { render : [] };
  this.childNodes  = [];

  for (var k in props) {
    if (k.substr(0, 4) === "once") {
      this.once(k.substr(4).toLowerCase(), props[k]);
    } else if (k.substr(0, 2) === "on") {
      this.on(k.substr(2).toLowerCase(), props[k]);
    } else if (k !== "ref") {
      this.attr(k, props[k]);
    }
  }

  this.append(childNodes);

  for (var i = 0, n = El.__onCreate.length; i < n; i++) {
    El.__onCreate[i].call(this);
  }
}

El.prototype.on = function (name, callback) {
  this.bus.on(name, callback);
  return this;
};

El.prototype.once = function (name, callback) {
  this.bus.once(name, callback);
  return this;
};

El.prototype.off = function (name, callback) {
  this.bus.off(name, callback);
  return this;
};

El.prototype.trigger = function (name, event) {
  this.bus.trigger(name, event);
  return this;
};

El.prototype.toString = function () {
  const tagName = this.tagName[0].toUpperCase() + this.tagName.slice(1);
  return "[object HTML" + tagName + "Element]";
};

El.prototype.html = function (value) {
  if (typeof value === "string") {
    const parsed    = parse(value);
    this.childNodes = parsed.childNodes;
    return this;
  } else {
    return this
      .children()
      .map(child => (
        child.toHtml
          ? child.toHtml()
          : child
      ))
      .join("\n");
  }
};

El.prototype.addClass     = require("./El/El.addClass");
El.prototype.after        = require("./El/El.after");
El.prototype.append       = require("./El/El.append");
El.prototype.appendTo     = require("./El/El.appendTo");
El.prototype.attr         = require("./El/El.attr");
El.prototype.children     = require("./El/El.children");
El.prototype.closest      = require("./El/El.closest");
El.prototype.disable      = require("./El/El.disable");
El.prototype.enable       = require("./El/El.enable");
El.prototype.find         = require("./El/El.find");
El.prototype.getNode      = require("./El/El.getNode");
El.prototype.insertBefore = require("./El/El.insertBefore");
El.prototype.is           = require("./El/El.is");
El.prototype.prepend      = require("./El/El.prepend");
El.prototype.parent       = require("./El/El.parent");
El.prototype.remove       = require("./El/El.remove");
El.prototype.removeChild  = require("./El/El.removeChild");
El.prototype.removeClass  = require("./El/El.removeClass");
El.prototype.replaceWith  = require("./El/El.replaceWith");
El.prototype.style        = require("./El/El.style");
El.prototype.text         = require("./El/El.text");
El.prototype.toFile       = require("./El/El.toFile");
El.prototype.toHtml       = require("./El/El.toHtml");

module.exports = El;