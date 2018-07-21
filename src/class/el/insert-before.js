export default function insertBefore(newNode, referenceNode) {
  const index = this.childNodes.indexOf(referenceNode.node);
  this.childNodes.splice(index - 1, 0, newNode.node);
  return this;
}
