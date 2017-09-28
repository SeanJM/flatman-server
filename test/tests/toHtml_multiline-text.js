const el = require("../../index").el;

module.exports = {
  name : "toHtml() multiline text",
  this() {
    var a = el("div", [
      "this is a line\nthis is another line\nthis is a last line",
    ]);
    return a.toHtml();
  },
  isEqual() {
    return "<div>\n  this is a line\n  this is another line\n  this is a last line\n</div>\n";
  }
};