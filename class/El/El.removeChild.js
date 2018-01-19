const unmount = require("../../tools/unmount");

module.exports = function removeChild(node) {
  this.childNodes.splice(this.childNodes.indexOf(node), 1);
  unmount(node);
  return this;
};
