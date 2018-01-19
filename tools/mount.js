const { MOUNTED } = require("./CONSTANTS");

module.exports = function mount(node, shouldMount) {
  const children = node.childNodes;
  let p          = node.parentNode;

  if (typeof shouldMount === "undefined") {
    while (p && p.parentNode) {
      p = p.parentNode;
    }
    shouldMount = p && p.tagName === "html";
  }

  if (children && shouldMount && MOUNTED.indexOf(node) === -1) {
    MOUNTED.push(node);
    node.trigger("mount");
    for (var i = 0, n = children.length; i < n; i++) {
      mount(children[i], shouldMount);
    }
  }
};