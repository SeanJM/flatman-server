const getSelectorGroup = require('../../tools/getSelectorGroup');
const getDomNode = require('../../tools/getDomNode');

function findNodes(node, selector) {
  let found = [];

  function find(childNodes) {
    childNodes.forEach(function (element) {
      var node = getDomNode(element);

      if (node) {
        if (node.is(selector)) {
          found.push(element);
        }
        find(node.childNodes);
      }
    });
  }

  find(node.childNodes);

  return found;
}

function findStringSelector(selector) {
  let selectorList = getSelectorGroup(selector);
  let found = [ [ this ] ];

  while (selectorList.length) {
    found[found.length - 1].forEach(function (node) {
      found.push(findNodes(node, selectorList[0]));
    });
    selectorList.shift();
  }

  return found.slice(-1)[0];
}

function findComponentSelector(selector) {
  let found = [];

  function find(childNodes) {
    childNodes.forEach(function (element) {
      if (element instanceof selector) {
        found.push(element);
      }
      find(element.childNodes);
    });
  }

  find(this.childNodes);

  return found;
}

module.exports = function find(selector) {
  if (typeof selector === 'string') {
    return findStringSelector.call(this, selector);
  } else if (typeof selector === 'function') {
    return findComponentSelector.call(this, selector);
  }
  throw new Error('Invalid selector for \'find\'');
};
