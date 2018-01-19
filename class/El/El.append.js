const setRefs = require("../../tools/setRefs");
const mount   = require("../../tools/mount");

module.exports = function append(childNodes) {
  [].concat(childNodes).forEach(child => {
    if (child) {
      let node = child.getNode ? child.getNode() : child;
      if (child.parentNode) {
        child.parentNode.removeChild(child);
      }
      setRefs.call(this, child);
      node.parentNode = this;
      this.childNodes.push(node);
      mount(child);
    }
  });

  return this;
};