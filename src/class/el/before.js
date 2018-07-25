module.exports = function before(target) {
  const targetNode = target.getNode();
  const parentNode = targetNode.parentNode;
  const index = parentNode && parentNode.childNodes.indexOf(targetNode);

  if (typeof index === "number") {
    this.parentNode = parentNode;
    if (index > -1) {
      parentNode.childNodes.splice(index, 0, this);
    } else {
      parentNode.childNodes.unshift(this);
    }
  } else {
    throw new Error("Cannot insert node after \"" + targetNode.tagName + "\", target does have a parent.");
  }

  return this;
};