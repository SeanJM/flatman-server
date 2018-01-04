module.exports = function replaceWith(domNode) {
  var index;
  if (this.parentNode) {
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes[index] = domNode;
  } else {
    Object.assign(this, domNode, { parentNode : this.parentNode });
  }
  return domNode;
};
