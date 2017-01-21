const getSelectorGroup = require('../../tools/getSelectorGroup');
const getDomNode = require('../../tools/getDomNode');

function findPredicate(predicate) {
  let found = [];

  function find(childNodes) {
    childNodes.forEach(function (element) {
      if (element.children) {
        if (predicate(element)) {
          found.push(element);
        }
        find(element.childNodes);
      }
    });
  }

  find(this.childNodes);
  return found;
}

function findStringSelector(selector) {
  let list = getSelectorGroup(selector);
  let found = [ [ this ] ];
  let self = this;

  function each (node) {
    found.push(findPredicate.call(node, function (element) {
      return element.is(list[0]);
    }));
  }

  while (list.length) {
    found[found.length - 1].forEach(each);
    list.shift();
  }

  return found.slice(-1)[0];
}


module.exports = function find(selector) {
  if (typeof selector === 'string') {
    return findStringSelector.call(this, selector);
  } else if (typeof selector === 'function') {
    return findPredicate.call(this, selector);
  }
  throw new Error('Invalid selector for \'find\'');
};
