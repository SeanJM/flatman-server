const { MOUNTED } = require("../constants/mounted");

module.exports = function mount(node, shouldMount) {
  const children = node.childNodes;
  let p = node.parentNode;

  if (typeof shouldMount === "undefined") {
    while (p && p.parentNode) {
      p = p.parentNode;
    }
    shouldMount = p && p.tagName === "html";
  }

  if (children && shouldMount && MOUNTED.indexOf(node) === -1) {
    for (var i = 0, n = children.length; i < n; i++) {
      mount(children[i], shouldMount);
    }
    MOUNTED.push(node);
    node.trigger("mount");
  }
};