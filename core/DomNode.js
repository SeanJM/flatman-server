const _ = require('lodash');
const predicates = require('../predicates/');
const isComponent = predicates.isComponent;
const isElement = predicates.isElement;
const setAttributes = require('../tools/setAttributes');

class DomNode {
  constructor(tagName, opts, children) {
    this.attributes = Object.assign({ class : '' }, setAttributes(opts));
    this.subscribers = { render : [] };

    if (typeof tagName === 'string' && tagName.indexOf(' ') === -1) {
      this.tagName = tagName;
    } else if (typeof tagName === 'string') {
      throw 'Invalid tagName: \'' + tagName + '\'.';
    } else {
      throw 'Invalid type for tagName: \'' + typeof tagName + '\'.';
    }

    this.children = children;
  }

  append() {
    if (typeof this.children === 'undefined') {
      this.children = [];
    }

    [].push.apply(this.children, Array.from(arguments));

    return this;
  }

  on(event, callback) {
    if (typeof this.subscribers[event] === 'undefined') {
      this.subscribers[event] = [];
    }
    if (!this.subscribers[event].includes(callback)) {
      this.subscribers[event].push(callback);
    }

    return this;
  }

  off(event, callback) {
    if (typeof this.subscribers[event] === 'undefined') {
      this.subscribers[event] = [];
    }
    if (this.subscribers[event].includes(callback)) {
      this.subscribers[event].splice(this.subscribers[event].indexOf(callback), 1);
    }

    return this;
  }

  trigger(event, opt) {
    if (Array.isArray(this.subscribers[event])) {
      this.subscribers[event].forEach(function (callback) {
        callback.call(this, opt);
      });
    }

    return this;
  }

  addClass(className) {
    var split = this.attributes.class.split(' ').map(a => a.trim());

    if (!split.includes(className)) {
      split.push(className);
    }

    this.attributes.class = split.sort().join(' ');

    return this;
  }

  hasClass(className) {
    return this.attributes.class
      .split(' ')
      .map(a => a.trim())
      .includes(className);
  }

  attr(property, value) {
    if (typeof value === 'undefined') {
      return this.attributes[property];
    }

    if (['tabIndex', 'tabindex'].indexOf(property) > -1) {
      this.attributes['tabIndex'] = value;
    } else if (property.slice(0, 4) === 'data') {
      this.attributes[_.kebabCase(property)] = value;
    } else {
      this.attributes[property] = value;
    }

    return this;
  }

  disable() {
    this.attributes.disabled = 'disabled';
  }

  enable() {
    delete this.attributes.disabled;
  }

  removeClass(className) {
    var split = this.attributes.class.split(' ').map(a => a.trim());

    split.splice(split.indexOf(className), 1);

    this.attributes.class = split.sort().join(' ');

    return this;
  }

  setId(value) {
    this.attributes.id = value.trim();
    return this;
  }

  text(value) {
    this.children.push(value);
  }

  html(value) {
    this.children = [value];
  }

  name(value) {
    if (typeof value !== 'undefined') {
      this.attributes.name = value;
    } else {
      return this.attributes.name;
    }
  }
}

module.exports = DomNode;
