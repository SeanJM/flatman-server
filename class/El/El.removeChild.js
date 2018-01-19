const unmount = require("../../tools/unmount");

module.exports = function removeChild(element) {
  const node = element.getNode ? element.getNode() : element;
  this.childNodes.splice(this.childNodes.indexOf(node), 1);
  unmount(node);
  return this;
};
