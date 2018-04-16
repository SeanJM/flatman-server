const el = require("../../index");

module.exports = {
  name : "toHtml() text and node",
  this() {
    const a = el([ "text", el("span", [ "test" ]) ]);
    return a.toHtml();
  },
  isEqual() {
    return "<div>\n  text<span>test</span>\n</div>";
  }
};