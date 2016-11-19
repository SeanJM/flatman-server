const isElement = require('./isElement');

function isComponent(x) {
  if (typeof x === 'function' ) {
    return true;
  }

  if (
    typeof x === 'object'
    && x.node
    && x.node.document
  ) {
    return true;
  }

  return false;
}

module.exports = isComponent;
