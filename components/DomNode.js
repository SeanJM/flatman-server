const r = require('require-resolver');
const methods = r('components/methods/');
const addClass = methods('addClass');
const append = methods('append');
const after = methods('after');
const before = methods('before');
const appendTo = methods('appendTo');
const attr = methods('attr');
const disable = methods('disable');
const enable = methods('enable');
const find = methods('find');
const hasClass = methods('hasClass');
const html = methods('html');
const name = methods('name');
const off = methods('off');
const on = methods('on');
const parents = methods('parents');
const prepend = methods('prepend');
const removeClass = methods('removeClass');
const replaceWith = methods('replaceWith');
const render = methods('render');
const renderTo = methods('renderTo');
const style = methods('style');
const text = methods('text');
const trigger = methods('trigger');

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
}

module.exports = DomNode;
