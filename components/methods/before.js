const getDomNode = require('../../tools/getDomNode');

module.exports = function before(MaybeNode) {
  const childNodes = this.parentNode.childNodes;
  const index = childNodes.indexOf(this);

  if (typeof MaybeNode === 'undefined') {
    return childNodes[index - 1];
  }

  childNodes.splice(index, 0, MaybeNode);
  return this;
};
