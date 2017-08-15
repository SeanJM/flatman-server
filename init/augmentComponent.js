const Component = require("flatman-component");
const toHtml = require("../components/methods/toHtml");

Component.fn("toHtml", function () {
  return toHtml.call(
    {
      tagName: this.document.tagName,
      attributes: this.document.attributes,
      trigger: this.trigger,
      childNodes: this.document.childNodes,
      parentNode: this.parentNode
    }
  );
});