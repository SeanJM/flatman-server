const getDomNode = require('../../tools/getDomNode');

module.exports = function before(node) {
  const childNodes = this.parentNode.childNodes;
  const index = childNodes.indexOf(this);

  if (typeof node === 'undefined') {
    return childNodes[index - 1];
  }

  childNodes.splice(index, 0, node.getNode());
  return this;
};
