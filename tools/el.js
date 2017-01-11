const predicates = require('../predicates/');
const isComponent = predicates.isComponent;
const isDomNode = predicates.isDomNode;

const DomNode = require('../components/DomNode');
const createComponent = require('./createComponent');
const Comment = require('../components/Comment');
const addClass = require('./addClass');
const Component = require('flatman-component');

function mapType(a) {
  if (typeof a === 'object') {
    if (isDomNode(a)) {
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
  let childNodes = [];
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
    childNodes = arguments[1];
    opts = arguments[2] || {};
  } else if (Array.isArray(arguments[2])) {
    childNodes = arguments[2] || [];
    opts = arguments[1] || {};
  } else if (typeof arguments[1] === 'object') {
    opts = arguments[1];
  }

  if (childNodes && childNodes.length) {
    if (childNodes.length > 1) {
      childNodes = childNodes.reduce(function (a, b) {
        if (Array.isArray(a)) {
          return a.concat(b);
        } else {
          return [a].concat(b);
        }
      });
    }

    childNodes.forEach(function (child, i) {
      if (Array.isArray(child)) {
        throw new Error('Invalid type \"Array\" in el, valid children are elements.');
      } else if (!isDomNode(child) && !isComponent(child) && typeof child !== 'string' && typeof child !== 'number') {
        throw new Error('Cannot append child to ' + stringName + ', child (' + i + ') is of type ' + typeof a);
      }
    });
  }

  if (typeof tagName === 'string' && tagName.substr(0, 2) === '//') {
    return new Comment(tagName.substr(2).trim());
  }

  if (typeof tagName === 'function') {
    return createComponent(tagName, opts, childNodes);
  }

  if (typeof tagName === 'string' && Component.lib[tagName]) {
    return createComponent(Component.lib[tagName], opts, childNodes);
  }

  return new DomNode(tagName, opts, childNodes);
}

el.isComponent = isComponent;
el.addClass = addClass;

module.exports = el;
