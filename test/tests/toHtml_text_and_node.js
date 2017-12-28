const el = require("../../index");

module.exports = {
  name : "toHtml() text and node",
  this() {
    const a = el("div", [ "text", el("div") ]);
    return a.toHtml();
  },
  isEqual() {
    return "<div>\n  text\n  <div></div>\n</div>\n";
  }
};