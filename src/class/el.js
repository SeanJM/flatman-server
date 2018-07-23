import { isObject } from "@predicates";
import Bus from "./bus";
import addClass from "./el/add-class";
import after from "./el/after";
import appendTo from "./el/append-to";
import append from "./el/append";
import attr from "./el/attr";
import before from "./el/before";
import children from "./el/children";
import clone from "./el/clone";
import closest from "./el/closest";
import findAll from "./el/find-all";
import find from "./el/find";
import getNode from "./el/get-node";
import html from "./el/html";
import is from "./el/is";
import parent from "./el/parent";
import parents from "./el/parents";
import prepend from "./el/prepend";
import previousNodes from "./el/previous-nodes";
import previous from "./el/previous";
import removeChild from "./el/remove-child";
import removeClass from "./el/remove-class";
import remove from "./el/remove";
import replaceWith from "./el/replace-with";
import siblings from "./el/siblings";
import style from "./el/style";
import text from "./el/text";
import toFile from "./el/to-file";
import toHtml from "./el/to-html";
import toJSON from "./el/to-json";

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

El.prototype.clone = clone(El);
El.prototype.html = html(El);

El.prototype.addClass = addClass;
El.prototype.after = after;
El.prototype.append = append;
El.prototype.appendTo = appendTo;
El.prototype.attr = attr;
El.prototype.before = before;
El.prototype.children = children;
El.prototype.closest = closest;
El.prototype.find = find;
El.prototype.findAll = findAll;
El.prototype.getNode = getNode;
El.prototype.is = is;
El.prototype.parent = parent;
El.prototype.parents = parents;
El.prototype.prepend = prepend;
El.prototype.previous = previous;
El.prototype.previousNodes = previousNodes;
El.prototype.remove = remove;
El.prototype.removeChild = removeChild;
El.prototype.removeClass = removeClass;
El.prototype.replaceWith = replaceWith;
El.prototype.siblings = siblings;
El.prototype.style = style;
El.prototype.text = text;
El.prototype.toFile = toFile;
El.prototype.toHtml = toHtml;
El.prototype.toJSON = toJSON;

El.__onCreate = [];
export default El;