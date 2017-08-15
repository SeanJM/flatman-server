module.exports = function append(children) {
  children.forEach(child => {
    if (child) {
      if (child.parentNode) {
        child.parentNode.childNodes
          .splice(child.parentNode.childNodes.indexOf(child), 1);
      }
      child.parentNode = this;
    }
  });

  [].push.apply(
    this.childNodes,
    children
  );

  return this;
};
