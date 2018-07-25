const { unmount } = require("../../tools");

module.exports = function removeChild(element) {
  const foundElement = this.find(element);
  const node = foundElement && element.getNode();
  if (node) {
    node.parentNode.childNodes.splice(node.parentNode.childNodes.indexOf(node), 1);
    unmount(node);
  }
  return this;
};
