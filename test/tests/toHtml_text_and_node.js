const el = require("../../index");

module.exports = {
  name : "toHtml() text and node",
  this() {
    const a = el([
      el("strong", [ "text" ]),
      "text"
    ]);
    return a.toHtml();
  },
  isEqual() {
    return "<div>\n  <strong>text</strong>text\n</div>";
  }
};