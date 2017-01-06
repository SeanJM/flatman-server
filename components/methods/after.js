const getDomNode = require('../../tools/getDomNode');

module.exports = function after(maybeNode) {
  const parentNode = this.parentNode;
  const index = parentNode.childNodes.indexOf(this);

  if (Array.isArray(maybeNode)) {
    maybeNode.forEach(a => after.call(this, a));
  } else if (typeof maybeNode === 'undefined') {
    return parentNode.childNodes[index + 1];
  } else {
    parentNode.childNodes.splice(index + 1, 0, maybeNode);
    getDomNode(maybeNode).parentNode = parentNode;
  }

  return this;
};
