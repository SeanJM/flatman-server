module.exports = function replaceWith(domNode) {
  var index = this.parentNode.childNodes.indexOf(this);
  this.parentNode.childNodes[index] = domNode;
  return domNode;
};
