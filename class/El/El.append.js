const setRefs = require("../../tools/setRefs");

module.exports = function append(childNodes) {
  [].concat(childNodes).forEach(child => {
    if (child) {
      if (child.parentNode) {
        child.parentNode.removeChild(child);
      }
      setRefs.call(this, child);
      child.parentNode = this;
      this.childNodes.push(child.getNode ? child.getNode() : child);
    }
  });

  return this;
};