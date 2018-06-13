const isObject = require("../predicates/isObject");
const Bus = require("./Bus");

function El() {
  const a = [arguments[0], arguments[1], arguments[2]];
  let tagName = "div";
  let childNodes = [];
  let props = {};

  for (var i = 0, n = a.length; i < n; i++) {
    if (typeof a[i] === "string") {
      tagName = a[i];
    } else if (Array.isArray(a[i])) {
      childNodes = a[i];
    } else if (isObject(a[i])) {
      props = a[i];
    }
  }

  this.attributes = {
    style: {},
    className: [],
    disabled: null,
    name: null,
  };

  this.ref = props.ref;
  this.refs = {};
  this.tagName = tagName;
  this.node = this;
  this.bus = new Bus({ target: this });
  this.subscribers = { render: [] };
  this.childNodes = [];

  if (props.data) {
    for (var k in props.data) {
      props["data" + k[0].toUpperCase() + k.substring(1)] = props.data[k];
    }
    delete props.data;
  }

  for (k in props) {
    if (k.substr(0, 4) === "once") {
      this.once(k.substr(4).toLowerCase(), props[k]);
    } else if (k.substr(0, 2) === "on") {
      this.on(k.substr(2).toLowerCase(), props[k]);
    } else if (k !== "ref" && k !== "data") {
      this.attr(k, props[k]);
    }
  }

  this.append(childNodes);

  for (i = 0, n = El.__onCreate.length; i < n; i++) {
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

El.prototype.clone = require("./El/El.clone")(El);

El.prototype.addClass = require("./El/El.addClass");
El.prototype.after = require("./El/El.after");
El.prototype.append = require("./El/El.append");
El.prototype.appendTo = require("./El/El.appendTo");
El.prototype.attr = require("./El/El.attr");
El.prototype.before = require("./El/El.before");
El.prototype.children = require("./El/El.children");
El.prototype.closest = require("./El/El.closest");
El.prototype.disable = require("./El/El.disable");
El.prototype.enable = require("./El/El.enable");
El.prototype.find = require("./El/El.find");
El.prototype.findAll = require("./El/El.findAll");
El.prototype.getNode = require("./El/El.getNode");
El.prototype.html = require("./El/El.html")(El);
El.prototype.insertBefore = require("./El/El.insertBefore");
El.prototype.is = require("./El/El.is");
El.prototype.parent = require("./El/El.parent");
El.prototype.parents = require("./El/El.parents");
El.prototype.prepend = require("./El/El.prepend");
El.prototype.previous = require("./El/El.previous");
El.prototype.previousNodes = require("./El/El.previousNodes");
El.prototype.remove = require("./El/El.remove");
El.prototype.removeChild = require("./El/El.removeChild");
El.prototype.removeClass = require("./El/El.removeClass");
El.prototype.replaceWith = require("./El/El.replaceWith");
El.prototype.siblings = require("./El/El.siblings");
El.prototype.style = require("./El/El.style");
El.prototype.text = require("./El/El.text");
El.prototype.toFile = require("./El/El.toFile");
El.prototype.toHtml = require("./El/El.toHtml");
El.prototype.toJSON = require("./El/El.toJSON");

El.__onCreate = [];
module.exports = El;