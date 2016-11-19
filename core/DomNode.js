const _ = require('lodash');
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

  append(array) {
    if (typeof this.children === 'undefined') {
      this.children = [];
    }

    if (arguments.length === 1 && Array.isArray(array)) {
      [].push.apply(this.children, array);
    } else {
      throw new Error('flatman: Invalid arguement for \'.append\', only a single array is allowed');
    }

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
    if (typeof value === 'string' || typeof value === 'number') {
      this.children = [value.toString()];
    } else {
      throw 'Invalid type of argument for \'.text\'';
    }
  }

  html(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      this.children = [value.toString()];
    } else {
      throw 'Invalid type of argument for \'.html\'';
    }
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
