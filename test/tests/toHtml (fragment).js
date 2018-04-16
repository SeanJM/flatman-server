const el = require("../../index");
const str  = "<div>\n  string<div></div><div></div><div></div>\n</div>";

module.exports = {
  name : "toHtml() (fragment)",
  this() {
    var a = el("div", [
      el("fragment", [
        "string",
        el("div"),
        el("div"),
        el("div")
      ])
    ]);
    return a.toHtml();
  },
  isEqual() {
    return str;
  }
};