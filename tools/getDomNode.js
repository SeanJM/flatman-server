const isComponent = require('../predicates/isComponent');
const isDomNode = require('../predicates/isDomNode');

module.exports = function getDomNode(maybeNode) {
  if (isDomNode(maybeNode)) {
    return maybeNode;
  } else if (isComponent(maybeNode)) {
    return getDomNode(maybeNode.node.document);
  }
  return false;
};
