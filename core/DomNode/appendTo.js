module.exports = function appendTo(parentNode) {
  this.parentNode = parentNode;
  parentNode.childNodes.push(this);
  return this;
};
