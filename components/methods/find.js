const _ = require('lodash');
const isComponent = require('../../predicates/isComponent');
const isDomNode = require('../../predicates/isDomNode');
const getSelectorObject = require('../../tools/getSelectorObject');

function hasClass(elementClass, selectorClass) {
  if (Array.isArray(selectorClass)) {
    return _.intersection(elementClass.split(' '), selectorClass).length;
  } else if (selectorClass) {
    return selectorClass.test(elementClass);
  }
}

function findStringSelector(selector) {
  let selectorObject = getSelectorObject(selector);
  let found = [];

  function matches(element) {
    if (selectorObject.tagName) {
      if (selectorObject.tagName !== element.tagName) {
        return;
      }
    }

    for (var k in selectorObject.attributes) {
      if (k === 'className') {
        if (!hasClass(element.attributes[k], selectorObject.attributes[k])) {
          return;
        }
      } else if (selectorObject.attributes[k]) {
        if (typeof selectorObject.attributes[k] === 'string') {
          if (selectorObject.attributes[k] !== element.attributes[k]) {
            return;
          }
        } else if (!selectorObject.attributes[k].test(element.attributes[k])) {
          return;
        }
      }
    }

    found.push(element);
  }

  function find(childNodes) {
    childNodes.forEach(function (element) {
      if (isComponent(element)) {
        matches(element.node.document);
        find(element.node.document.childNodes);
      } else if (isDomNode(element)) {
        matches(element);
        find(element.childNodes);
      }
    });
  }

  find(this.childNodes);
  return found;
}

function findObjectSelector(selector) {
  let found = [];
  function find(childNodes) {
    childNodes.forEach(function (element) {
      if (element instanceof selector) {
        found.push(element);
      }
      if (isComponent(element)) {
        find(element.node.document.childNodes);
      } else if (isDomNode(element)) {
        find(element.childNodes);
      }
    });
  }
  find(this.childNodes);
  return found;
}

module.exports = function find(selector) {
  if (typeof selector === 'string') {
    return findStringSelector.call(this, selector);
  } else if (typeof selector === 'object') {
    return findObjectSelector.call(this, selector);
  }
  throw new Error('Invalid selector for \'find\'');
};
