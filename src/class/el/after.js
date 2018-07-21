export default function after(target) {
  const targetNode = target.getNode();
  const parentNode = targetNode.parentNode;
  const index = parentNode && parentNode.childNodes.indexOf(targetNode);

  if (typeof index === "number") {
    this.parentNode = parentNode;
    parentNode.childNodes.splice(index + 1, 0, this);
  } else {
    throw new Error("Cannot insert node after \"" + targetNode.tagName + "\", target does have a parent.");
  }

  return this;
}