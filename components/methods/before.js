const getDomNode = require('../../tools/getDomNode');

module.exports = function before(MaybeNode) {
  this.parentNode.childNodes.splice(this.parentNode.childNodes.indexOf(this), 0, MaybeNode);
  return this;
};
