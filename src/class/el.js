const Bus = require("./bus");

/**
 * @param {string} tagName - The nodes tagName
 * @param {object} attributes - The nodes attributes
 * @param {array} childNodes - An array of children, strings or elements
 * */
function El(tagName, attributes, childNodes) {
  this.attributes = {
    style: {},
    className: [],
    disabled: null,
    name: null,
  };

  this.ref = attributes.ref;
  this.refs = {};
  this.tagName = tagName;
  this.node = this;
  this.bus = new Bus({ target: this });
  this.subscribers = { render: [] };
  this.childNodes = [];

  if (attributes.data) {
    for (var k in attributes.data) {
      attributes["data" + k[0].toUpperCase() + k.substring(1)] = attributes.data[k];
    }
    delete attributes.data;
  }

  for (k in attributes) {
    if (k.substr(0, 4) === "once") {
      this.once(k.substr(4).toLowerCase(), attributes[k]);
    } else if (k.substr(0, 2) === "on") {
      this.on(k.substr(2).toLowerCase(), attributes[k]);
    } else if (k !== "ref" && k !== "data") {
      this.attr(k, attributes[k]);
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

El.prototype.clone = require("./el/clone")(El);
El.prototype.append = require("./el/append")(El);
El.prototype.html = require("./el/html")(El);

El.prototype.addClass = require("./el/add-class");
El.prototype.after = require("./el/after");
El.prototype.appendTo = require("./el/append-to");
El.prototype.attr = require("./el/attr");
El.prototype.before = require("./el/before");
El.prototype.children = require("./el/children");
El.prototype.closest = require("./el/closest");
El.prototype.contains = require("./el/contains");
El.prototype.find = require("./el/find");
El.prototype.findAll = require("./el/find-all");
El.prototype.getNode = require("./el/get-node");
El.prototype.is = require("./el/is");
El.prototype.parent = require("./el/parent");
El.prototype.parents = require("./el/parents");
El.prototype.prepend = require("./el/prepend");
El.prototype.previous = require("./el/previous");
El.prototype.previousNodes = require("./el/previous-nodes");
El.prototype.remove = require("./el/remove");
El.prototype.removeChild = require("./el/remove-child");
El.prototype.removeClass = require("./el/remove-class");
El.prototype.replaceWith = require("./el/replace-with");
El.prototype.siblings = require("./el/siblings");
El.prototype.style = require("./el/style");
El.prototype.text = require("./el/text");
El.prototype.toFile = require("./el/to-file");
El.prototype.toHtml = require("./el/to-html");
El.prototype.toJSON = require("./el/to-json");

El.__onCreate = [];
module.exports = El;