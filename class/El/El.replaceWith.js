const mount   = require("../../tools/mount");
const unmount = require("../../tools/unmount");

module.exports = function replaceWith(domNode) {
  var index;
  if (this.parentNode) {
    unmount(this);
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes[index] = domNode;
    mount(domNode);
  } else {
    Object.assign(this, domNode, { parentNode : this.parentNode });
  }
  return domNode;
};
