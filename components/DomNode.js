const addClass = require('./methods/addClass');
const append = require('./methods/append');
const after = require('./methods/after');
const before = require('./methods/before');
const appendTo = require('./methods/appendTo');
const attr = require('./methods/attr');
const disable = require('./methods/disable');
const enable = require('./methods/enable');
const find = require('./methods/find');
const hasClass = require('./methods/hasClass');
const html = require('./methods/html');
const name = require('./methods/name');
const off = require('./methods/off');
const on = require('./methods/on');
const parents = require('./methods/parents');
const prepend = require('./methods/prepend');
const removeClass = require('./methods/removeClass');
const replaceWith = require('./methods/replaceWith');
const render = require('./methods/render');
const renderTo = require('./methods/renderTo');
const style = require('./methods/style');
const text = require('./methods/text');
const trigger = require('./methods/trigger');

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

module.exports = class DomNode {
  constructor(tagName, opt, childNodes) {
    this.attributes = {
      style : {},
      className : ''
    };

    this.subscribers = { render : [] };

    for (var k in opt) {
      this.attr(k, opt[k]);
    }

    if (typeof tagName === 'string' && tagName.indexOf(' ') === -1) {
      this.tagName = tagName;
    } else if (typeof tagName === 'string') {
      throw new Error('Invalid tagName: \'' + tagName + '\'.');
    } else {
      throw new Error('Invalid type for tagName: \'' + typeof tagName + '\'.');
    }

    this.append(childNodes);
  }

  toString() {
    return '[object HTML' + this.tagName[0].toUpperCase() + this.tagName.slice(1) + 'Element]';
  }

  isBlockElement() {
    return INLINE.indexOf(this.tagName) === -1;
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

  render() {
    return render.call(this);
  }

  renderTo(filename) {
    return renderTo.call(this, filename);
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

  name(value) {
    return name.call(this, value);
  }
};
