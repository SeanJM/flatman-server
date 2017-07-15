module.exports = function after(node) {
  var parentNode = node.parentNode;
  var childNodes = parentNode.childNodes;
  var index = childNodes.indexOf(node);
  childNodes.splice(index + 1, 0, this);
  return this;
};
