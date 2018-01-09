function findPredicate(predicate) {
  const found = [];

  function find(node) {
    if (predicate(node)) {
      found.push(node);
    }
    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      find(node.childNodes[i]);
    }
  }

  this.node.childNodes.forEach(find);
  return found;
}

function findStringSelector(selector) {
  const found = [];

  function find(node) {
    if (node.is && node.is(selector)) {
      found.push(node);
    }
    for (var i = 0, n = node.childNodes.length; i < n; i++) {
      find(node.childNodes[i]);
    }
  }

  this.node.childNodes.forEach(find);
  return found;
}

module.exports = function find(selector) {
  if (typeof selector === "string") {
    return findStringSelector.call(this, selector);
  } else if (typeof selector === "function") {
    return findPredicate.call(this, selector);
  }
  throw new Error("Invalid selector for 'find'");
};