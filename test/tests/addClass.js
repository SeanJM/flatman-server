const el = require("../../index");

module.exports = {
  name : "addClass()",
  this() {
    var a = el("div");
    a.addClass("test");
    return a.attributes.className.indexOf("test") > -1;
  },
  isEqual() {
    return true;
  }
};