module.exports = function after(target) {
  const parentNode = target.getNode().parentNode;
  const index      = parentNode.childNodes.indexOf(target);
  parentNode.childNodes.splice(index + 1, 0, this);
  return this;
};