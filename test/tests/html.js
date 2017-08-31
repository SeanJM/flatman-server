const el = require("../../index").el;

module.exports = {
  name : "html()",
  this() {
    var a = el("div");
    a.html("<span></span>");
    return [ a.childNodes[0].tagName, a.html() ];
  },
  isDeepEqual() {
    return [ "span", "<span></span>\n" ];
  }
};