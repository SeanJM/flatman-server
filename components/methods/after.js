const getDomNode = require('../../tools/getDomNode');

module.exports = function after(MaybeNode) {
  const index = this.parentNode.childNodes.indexOf(this);

  if (Array.isArray(MaybeNode)) {
    throw new Error('Invalid argument for \'.after\', method takes a valid Node or Component and not an Array.');
  } else if (typeof MaybeNode === 'undefined') {
    return this.parentNode.childNodes[index + 1];
  }

  this.parentNode.childNodes.splice(index + 1, 0, MaybeNode);
  getDomNode(MaybeNode).parentNode = this.parentNode;
  return this;
};
