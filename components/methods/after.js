module.exports = function after(maybeNode) {
  let index;

  if (Array.isArray(maybeNode)) {
    maybeNode.forEach(a => after.call(this, a));
  } else if (maybeNode && this.parentNode) {
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes.splice(index + 1, 0, maybeNode);
    maybeNode.parentNode = this.parentNode;
    return this;
  } else if (!this.parentNode) {
    throw new Error('Invalid node, \"' + this.tagName + '\" does not have a parentNode.');
  }

  index = this.parentNode.childNodes.indexOf(this);

  return index > -1
    ? this.parentNode.childNodes[index + 1]
    : false;
};
