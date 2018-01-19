const { MOUNTED } = require("./CONSTANTS");

module.exports = function mount(node) {
  const children = node.childNodes;
  let p          = node.parentNode;

  while (p && p.parentNode) {
    p = p.parentNode;
  }

  if (children && p && p.tagName === "html" && MOUNTED.indexOf(node) === -1) {
    MOUNTED.push(node);

    node.trigger("mount");

    for (var i = 0, n = children.length; i < n; i++) {
      mount(children[i]);
    }
  }
};