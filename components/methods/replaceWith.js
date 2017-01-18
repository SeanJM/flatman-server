module.exports = function replaceWith(domNode) {
  var index;
  if (this.parentNode) {
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes[index] = domNode;
    return domNode;
  } else {
    throw new Error('Cannot run \'DomNode.prototype.replaceWith\', node requires a parentNode.');
  }
};
