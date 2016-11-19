const predicates = require('./predicates/');
const isComponent = predicates.isComponent;
const isElement = predicates.isElement;

const DomNode = require('./core/DomNode');
const Component = require('./core/Component');
const report = require('./tools/report');

function el(tagName) {
  let opts = {};
  let children = [];

  if (arguments.length && typeof tagName === 'undefined') {
    throw 'invalid element \'undefined\'';
  } else {
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
}

el.isComponent = isComponent;

module.exports = el;
