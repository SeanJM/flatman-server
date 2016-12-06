const append = require('./append');
const appendTo = require('./appendTo');
const on = require('./on');
const off = require('./off');
const trigger = require('./trigger');
const addClass = require('./addClass');
const hasClass = require('./hasClass');
const attr = require('./attr');
const find = require('./find');
const disable = require('./disable');
const enable = require('./enable');
const removeClass = require('./removeClass');
const style = require('./style');
const text = require('./text');
const html = require('./html');
const name = require('./name');
const render = require('./render');
const parents = require('./parents');

const INLINE = [
  'a',
  'span',
  'li',
  'u',
  'b',
  'i',
  'strong',
  'em'
];

class DomNode {
  constructor(tagName, opt, childNodes) {
    var attributes = {
      style : {},
      className : ''
    };

    if (typeof opt.style === 'string') {
      throw new Error('Invalid value of "' + opt.style.substr(0, 30) + '", style must be passed an object as an argument and not a string.');
    }

    this.attributes = Object.assign(attributes, opt);
    this.subscribers = { render : [] };

    if (typeof tagName === 'string' && tagName.indexOf(' ') === -1) {
      this.tagName = tagName;
    } else if (typeof tagName === 'string') {
      throw new Error('Invalid tagName: \'' + tagName + '\'.');
    } else {
      throw new Error('Invalid type for tagName: \'' + typeof tagName + '\'.');
    }

    this.append(childNodes);
  }

  isBlockElement() {
    return INLINE.indexOf(this.tagName) === -1;
  }

  append(childNodes) {
    return append.call(this, childNodes);
  }

  appendTo(parent) {
    return appendTo.call(this, parent);
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

  parents() {
    return parents.call(this);
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

  render() {
    return render.call(this);
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

  name(value) {
    return name.call(this, value);
  }
}

module.exports = DomNode;
