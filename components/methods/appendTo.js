module.exports = function appendTo(parentNode) {
  this.parentNode = parentNode.getNode();
  this.parentNode.childNodes.push(this);
  return this;
};
