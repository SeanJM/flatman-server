const { MOUNTED } = require("./CONSTANTS");

module.exports = function mount(node) {
  const children     = node.childNodes;
  const isOnDocument = node.closest && node.closest("html");

  if (children && isOnDocument && MOUNTED.indexOf(node) === -1) {
    MOUNTED.push(node);

    node.trigger("mount");

    for (var i = 0, n = children.length; i < n; i++) {
      mount(children[i]);
    }
  }
};