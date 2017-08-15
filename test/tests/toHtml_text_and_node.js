const el = require("../../index").el;

module.exports = {
  name : "toHtml() text and node",
  this() {
    const a = el("div", [ "text", el("div") ]);
    return a.toHtml();
  },
  isEqual() {
    return "<div>text\n  <div></div>\n</div>";
  }
};