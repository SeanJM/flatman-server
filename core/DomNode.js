const _ = require('lodash');
const setAttributes = require('../tools/setAttributes');

class DomNode {
  constructor(tagName, opts, children) {
    this.attributes = Object.assign({ class : '' }, setAttributes(opts));
    this.subscribers = { render : [] };

    if (typeof tagName === 'string' && tagName.indexOf(' ') === -1) {
      this.tagName = tagName;
    } else if (typeof tagName === 'string') {
      throw new Error('Invalid tagName: \'' + tagName + '\'.');
    } else {
      throw new Error('Invalid type for tagName: \'' + typeof tagName + '\'.');
    }

    this.children = children;
  }

  append(children) {
    if (typeof this.children === 'undefined') {
      this.children = [];
    }

    if (arguments.length === 1 && Array.isArray(children)) {
      [].push.apply(this.children, children);
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

  find(selector) {
    const tagName = selector.match(/^[a-z\-]+/);
    const className = selector.match(/\.[a-zA-Z0-9\_\-]+/g);
    function hasClass(node, b) {
      var i = 0;
      var n = b.length;
      var a = node.attr.className.split(' ');
      for (; i < n; i++) {
        if (a.indexOf(b[i]) === -1) {
          return false;
        }
      }
      return true;
    }
    return this.children.filter(function (node) {
      if (tagName && className) {
        return node.tagName === tagName[0] && hasClass(node, className);
      } else if (tagName) {
        return node.tagName === tagName[0];
      }
    });
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
      throw new Error('Invalid type of argument "' + typeof value + '" for \'.text\'');
    }
  }

  html(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      this.children = [value.toString()];
    } else {
      throw new Error('Invalid type of argument for \'.html\'');
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
