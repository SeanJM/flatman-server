const el = require("../../index");

module.exports = {
  name : "clone()",
  this() {
    var a = el("div");
    var b = a.clone();
    return a === b;
  },
  isDeepEqual() {
    return false;
  }
};