const componentToHtml = require("./component-to-html");
const htmlToHtml = require("./html-to-html");

module.exports = function elementToHtml(vnode, depth = 0) {
  // Is component
  if (typeof vnode.tagName === "function") {
    return componentToHtml(vnode, depth);
  }
  return htmlToHtml(vnode, depth);
};
