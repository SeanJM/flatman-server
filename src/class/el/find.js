const { isDomNode } = require("../../predicates");

function findPredicate(predicate) {
  function find(node) {
    let t;
    if (predicate(node)) {
      return node;
    } else {
      for (var i = 0, n = node.childNodes.length; i < n; i++) {
        t = find(node.childNodes[i]);
        if (t) {
          return t;
        }
      }
    }
    return false;
  }

  return find(this.node);
}

function findStringSelector(selector) {
  function find(node) {
    let t;
    if (node.is && node.is(selector)) {
      return node;
    } else if (node.childNodes) {
      for (var i = 0, n = node.childNodes.length; i < n; i++) {
        t = find(node.childNodes[i]);
        if (t) {
          return t;
        }
      }
    }
    return false;
  }

  return find(this.node);
}

module.exports = function find(selector) {
  if (typeof selector === "string") {
    return findStringSelector.call(this, selector);
  } else if (typeof selector === "function") {
    return findPredicate.call(this, selector);
  } else if (isDomNode(selector)) {
    return findPredicate.call(this, function (node) {
      return node === selector;
    });
  }
  throw new Error("Invalid selector for 'find'");
};
