const mount = require("../../tools/mount");

module.exports = function appendTo(parentNode) {
  parentNode.childNodes.push(this);
  this.parentNode = parentNode;
  mount(this);
  return this;
};
