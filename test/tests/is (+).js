const el = require("../../index");

module.exports = {
  name : "is() (+)",
  this() {
    var a = el("html", {
      style     : {},
      class     : "",
      disabled  : null,
      name      : null,
      xmlns     : "http://www.w3.org/1999/xhtml"
    });
    return a.is("+");
  },
  isEqual() {
    return false;
  }
};