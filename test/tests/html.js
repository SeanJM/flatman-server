const el = require("../../index");

module.exports = {
  name : "html()",
  this() {
    var a = el("div");
    a.html("<span></span>");
    return [ a.children()[0].tagName, a.html() ];
  },
  isDeepEqual() {
    return [ "span", "<span></span>\n" ];
  }
};