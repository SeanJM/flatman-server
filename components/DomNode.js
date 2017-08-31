const addClass = require("./methods/addClass");
const append = require("./methods/append");
const after = require("./methods/after");
const before = require("./methods/before");
const insertBefore = require("./methods/insertBefore");
const appendTo = require("./methods/appendTo");
const attr = require("./methods/attr");
const disable = require("./methods/disable");
const children = require("./methods/children");
const closest = require("./methods/closest");
const getNode = require("./methods/getNode");
const enable = require("./methods/enable");
const is = require("./methods/is");
const find = require("./methods/find");
const hasClass = require("./methods/hasClass");
const html = require("./methods/html");
const off = require("./methods/off");
const on = require("./methods/on");
const parent = require("./methods/parent");
const prepend = require("./methods/prepend");
const removeClass = require("./methods/removeClass");
const replaceWith = require("./methods/replaceWith");
const toHtml = require("./methods/toHtml");
const toFile = require("./methods/toFile");
const style = require("./methods/style");
const text = require("./methods/text");
const trigger = require("./methods/trigger");

module.exports = class DomNode {
  constructor(tagName, opt, childNodes) {
    var once = [];
    var on = [];
    var attr = [];

    this.attributes = {
      style : {},
      className : [],
      disabled : null,
      name : null,
    };

    this.node = this;
    this.subscribers = { render : [] };
    this.childNodes = [];

    for (var k in opt) {
      if (k === "ref") {
        this.ref = opt[k];
      } else if (k.substr(0, 4) === "once") {
        once.push({
          name : k.substr(4).toLowerCase(),
          value : opt[k]
        });
      } else if (k.substr(0, 2) === "on") {
        on.push({
          name : k.substr(2).toLowerCase(),
          value : opt[k]
        });
      } else {
        attr.push({
          name : k,
          value : opt[k]
        });
      }
    }

    attr.forEach(element => this.attr(element.name, element.value));
    once.forEach(element => this.once(element.name, element.value));
    on.forEach(element => this.on(element.name, element.value));

    if (typeof tagName === "string" && tagName.indexOf(" ") === -1) {
      this.tagName = tagName;
    } else if (typeof tagName === "string") {
      throw new Error("Invalid tagName: \'" + tagName + "\'.");
    } else {
      throw new Error("Invalid type for tagName: \'" + typeof tagName + "\'.");
    }

    this.append(childNodes);
  }

  toString() {
    return "[object HTML" + this.tagName[0].toUpperCase() + this.tagName.slice(1) + "Element]";
  }

  append(childNodes) {
    return append.call(this, childNodes);
  }

  after(maybeNode) {
    return after.call(this, maybeNode);
  }

  appendTo(parent) {
    return appendTo.call(this, parent);
  }

  before(maybeNode) {
    return before.call(this, maybeNode);
  }

  insertBefore(newNode, referenceNode) {
    return insertBefore.call(this, newNode, referenceNode);
  }

  children(a, b) {
    return children.call(this, a, b);
  }

  closest(selector) {
    return closest.call(this, selector);
  }

  getNode() {
    return getNode.call(this);
  }

  is(selector) {
    return is.call(this, selector);
  }

  on(event, callback) {
    return on.call(this, event, callback);
  }

  off(event, callback) {
    return off.call(this, event, callback);
  }

  trigger(event, opt) {
    return trigger.call(this, event, opt);
  }

  addClass(className) {
    return addClass.call(this, className);
  }

  hasClass(className) {
    return hasClass.call(this, className);
  }

  attr(property, value) {
    return attr.call(this, property, value);
  }

  find(selector) {
    return find.call(this, selector);
  }

  parent() {
    return parent.call(this);
  }

  prepend(childNodes) {
    return prepend.call(this, childNodes);
  }

  disable() {
    return disable.call(this);
  }

  enable() {
    return enable.call(this);
  }

  removeClass(className) {
    return removeClass.call(this, className);
  }

  remove() {
    this.parentNode.removeChild(this);
    return this;
  }

  removeChild(node) {
    this.childNodes.splice(this.childNodes.indexOf(node), 1);
    return this;
  }

  toHtml(depth) {
    return toHtml.call(this, depth);
  }

  toFile(filename) {
    return toFile.call(this, filename);
  }

  replaceWith(node) {
    return replaceWith.call(this, node);
  }

  style(property, value) {
    return style.call(this, property, value);
  }

  text(value) {
    return text.call(this, value);
  }

  html(value) {
    return html.call(this, value);
  }
};
