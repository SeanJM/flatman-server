const isComponent = require('../../predicates/isComponent');
const isDomNode = require('../../predicates/isDomNode');
const getSelectorObject = require('../../tools/getSelectorObject');

module.exports = function find(selector) {
  const selectorObject = getSelectorObject(selector);
  let found = [];

  function hasClass(elementClass, selectorClass) {
    const elementSplit = elementClass.split(' ');
    const selectorSplit = selectorClass.split(' ');
    return selectorSplit.length === _.intersection(elementSplit, selectorSplit).length;
  }

  function matches(element) {
    if (selectorObject.tagName) {
      if (selectorObject.tagName !== element.tagName) {
        return;
      }
    }

    for (var k in selectorObject.attributes) {
      if (selectorObject.attributes[k].length) {
        if (k === 'class') {
          if (!hasClass(element.attributes[k], selectorObject.attributes[k])) {
            return;
          }
        } else {
          if (selectorObject.attributes[k] !== element.attributes[k]) {
            return;
          }
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
};
