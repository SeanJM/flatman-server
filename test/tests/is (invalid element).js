const el = require("../../index");

module.exports = {
  name : "is() (invalid element)",
  this() {
    var a = el("div");
    return a.is("table");
  },
  isDeepEqual() {
    return false;
  }
};