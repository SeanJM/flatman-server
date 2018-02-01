module.exports = function before(child) {
  const targetNode = child.getNode();
  const parentNode = this.parentNode;
  const index      = parentNode && parentNode.childNodes.indexOf(this);

  if (typeof index === "number") {
    targetNode.parentNode = parentNode;
    if (index > -1) {
      parentNode.childNodes.splice(index, 0, targetNode);
    } else {
      parentNode.childNodes.unshift(targetNode);
    }
  } else {
    throw new Error("Cannot insert node after \"" + targetNode.tagName + "\", target does have a parent.");
  }

  return this;
};