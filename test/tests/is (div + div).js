const el = require("../../index");

module.exports = {
  name : "is() (div + div)",
  this() {
    var a = el();
    var b = el();
    el([ a, b ]);
    return b.is("div + div");
  },
  isEqual() {
    return true;
  }
};