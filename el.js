const predicates = require('./predicates/');
const isComponent = predicates.isComponent;
const isElement = predicates.isElement;

const DomNode = require('./core/DomNode');
const Component = require('./core/Component');

function mapType(a) {
  if (typeof a === 'object') {
    if (isElement(a)) {
      return 'element';
    } else if (isComponent(a)) {
      return 'component';
    } else if (Array.isArray(a)) {
      return 'array';
    }
  }
  return typeof a;
}

function el(tagName) {
  let opts = {};
  let children = [];
  let args = [];
  let types = [];

  let i = 0;
  let n = arguments.length;

  for (; i < n; i++) {
    args.push(arguments[i]);
    types.push(mapType(arguments[i]));
  }

  let stringName = typeof tagName === 'string'
    ? tagName
    : typeof tagName === 'function' && typeof tagName.name === 'string'
      ? tagName.name
      : 'Anonymous';

  if (types.slice(1).indexOf('string') !== -1) {
    throw new Error('Invalid argument \"' + args[types.slice(1).indexOf('string') + 1].substr(0, 20) + '\" (' + (types.slice(1).indexOf('string') + 1) + ') for \"' + stringName + '\", strings are not allowed as arguments. Children must be wrapped in an array.');
  } else if (types.indexOf('number') !== -1) {
    throw new Error('Invalid argument \"' + args[types.indexOf('number')] + '\" (' + types.indexOf('number') + ') for \"' + stringName + '\", numbers are not allowed as arguments. Children must be wrapped in an array.');
  } else if (types.indexOf('undefined') !== -1) {
    throw new Error('Invalid argument \"undefined\" (' + types.indexOf('undefined') + ') for ' + stringName + '.');
  } else if (types.indexOf('element') !== -1) {
    throw new Error('Invalid argument \"' + args[types.indexOf('element')].tagName + '\" (' + types.indexOf('element') + ') for \"' + stringName + '\", elements are not allowed as arguments. Children must be wrapped in an array.');
  } else if (types.indexOf('component') !== -1) {
    throw new Error('Invalid argument \"' + args[types.indexOf('component')].tagName + '\" (' + types.indexOf('component') + ') for \"' + stringName + '\", components are not allowed as arguments. Children must be wrapped in an array.');
  } else if (args.length > 3) {
    throw new Error('Invalid number of args (' + args.length + ') for \"' + stringName + '\".');
  }

  if (Array.isArray(arguments[1])) {
    children = arguments[1];
    opts = arguments[2] || {};
  } else if (Array.isArray(arguments[2])) {
    children = arguments[2] || [];
    opts = arguments[1] || {};
  } else if (typeof arguments[1] === 'object') {
    opts = arguments[1];
  }

  if (children && children.length) {
    if (children.length > 1) {
      children = children.reduce(function (a, b) {
        if (Array.isArray(a)) {
          return a.concat(b);
        } else {
          return [a].concat(b);
        }
      });
    }

    children.forEach(function (child, i) {
      if (Array.isArray(child)) {
        throw new Error('Invalid type \"Array\" in el, valid children are elements.');
      } else if (!isElement(child) && !isComponent(child) && typeof child !== 'string' && typeof child !== 'number') {
        throw new Error('Cannot append child to ' + stringName + ', child (' + i + ') is of type ' + typeof a);
      }
    });
  }

  if (typeof tagName === 'function') {
    return new Component(tagName, opts, children);
  }

  return new DomNode(tagName, opts, children);
}

el.isComponent = isComponent;

module.exports = el;
