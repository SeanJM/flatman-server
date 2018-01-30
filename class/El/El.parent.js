module.exports = function parent() {
  let parentNode = this.parentNode;

  while (parentNode && parentNode.tagName === "fragment") {
    parentNode = parentNode.parentNode;
  }

  return parentNode;
};
