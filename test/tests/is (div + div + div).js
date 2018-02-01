const el = require("../../index");

module.exports = {
  name : "is() (div + div + div)",
  this() {
    var a = el();
    var b = el();
    var c = el();
    var d = el();
    d.append([ a, b, c ]);
    return c.is("div + div + div");
  },
  isEqual() {
    return true;
  }
};