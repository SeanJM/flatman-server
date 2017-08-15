module.exports = function appendTo(parentNode) {
  parentNode.childNodes.push(this);
  this.parentNode = parentNode;
  return this;
};
