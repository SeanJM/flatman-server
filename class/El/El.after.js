module.exports = function after(target) {
  const targetNode = target.getNode();
  const parentNode = targetNode.parentNode;
  const index      = parentNode && parentNode.childNodes.indexOf(target);

  if (typeof index === "number") {
    parentNode.childNodes.splice(index + 1, 0, this);
  } else {
    throw new Error("Cannot insert node after \"" + targetNode.tagName + "\", target does have a parent.");
  }

  return this;
};