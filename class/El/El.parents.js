module.exports = function parents() {
  const parents  = [];
  let parentNode = this.parentNode;

  while (parentNode) {
    parents.push(parentNode);
    parentNode = parentNode.parent();
    while (parentNode && parentNode.tagName === "fragment") {
      parentNode = parentNode.parent();
    }
  }

  return parents;
};
