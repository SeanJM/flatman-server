const predicates = require('./predicates/');
const isComponent = predicates.isComponent;
const isElement = predicates.isElement;

const DomNode = require('./core/DomNode');
const Component = require('./core/Component');
const report = require('./tools/report');

function el(tagName) {
  let opts = {};
  let children = [];
  let types = Array.from(arguments).map(a => typeof a);

  if (types.indexOf('string') !== -1) {
    throw 'Invalid argument \'' + types[types.indexOf('string')] + '\' (' + types.indexOf('string') + ') for ' + tagName + ', strings are not allowed as arguments. Children must be wrapped in an array.';
  } else if (types.indexOf('number') !== -1) {
    throw 'Invalid argument \'' + types[types.indexOf('number')] + '\' (' + types.indexOf('number') + ') for ' + tagName + ', numbers are not allowed as arguments. Children must be wrapped in an array.';
  } else if (types.indexOf('undefined') !== -1) {
    throw 'Invalid argument \'undefined\' (' + types.indexOf('undefined') + ') for ' + tagName + '.';
  }

  if (Array.isArray(arguments[1])) {
    children = arguments[1];
    opts = arguments[2] || {};
  } else if (Array.isArray(arguments[2])) {
    children = arguments[2] || [];
    opts = arguments[1] || {};
  } else if (typeof arguments[1] === 'object') {
    if (isElement(arguments[1])) {
      throw new Error('Invalid argument, you passed an element into the \'el\' function. Elements must be put in an array.');
    } else if (isComponent(arguments[1])) {
      throw new Error('Invalid argument, you passed a component into the \'el\' function. Components must be put in an array.');
    }
    opts = arguments[1];
  }

  children.forEach(function (child) {
    if (Array.isArray(child)) {
      throw new Error('Invalid type \'Array\' in el, valid children are elements.');
    } else if (!isElement(child) && !isComponent(child) && typeof child !== 'string' && typeof child !== 'number') {
      throw new Error('Invalid child of type ' + typeof a);
    }
  });

  try {
    if (typeof tagName === 'function') {
      return new Component(tagName, opts, children);
    }

    return new DomNode(tagName, opts, children);
  } catch (e) {
    report.error(e);
  }
}

el.isComponent = isComponent;

module.exports = el;
