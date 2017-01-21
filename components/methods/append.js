module.exports = function append(childNodes) {
  const childNodesRoot = childNodes.map(a => a.getNode ? a.getNode() : a);

  childNodesRoot.forEach((child) => {
    if (child && child.trigger) {
      if (child.parentNode) {
        child.remove();
      }
      child.parentNode = this
    };
  });

  if (arguments.length === 1 && Array.isArray(childNodesRoot)) {
    [].push.apply(this.childNodes, childNodesRoot);
  }

  return this;
};
