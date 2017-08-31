const Component = require("flatman-component");

Component.fn("toHtml", function (depth) {
  return this.document.toHtml(depth);
});