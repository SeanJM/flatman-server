const el = require("../../index");

module.exports = {
  name : "toHtml() (simple)",
  this() {
    var a = el("span");
    return a.toHtml();
  },
  isEqual() {
    return "<span></span>\n";
  }
};