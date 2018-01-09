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
    if (node) {
      if (node.is && node.is(selector)) {
        return node;
      } else {
        for (var i = 0, n = node.childNodes.length; i < n; i++) {
          t = find(node.childNodes[i]);
          if (t) {
            return t;
          }
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
  }
  throw new Error("Invalid selector for 'find'");
};
