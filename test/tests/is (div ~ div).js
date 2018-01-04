const el = require("../../index");

module.exports = {
  name : "is() (div ~ div)",
  this() {
    var a = el();
    var b = el("table");
    var c = el();
    el([ a, b, c ]);
    return c.is("div ~ div") && !b.is("table + table") && b.is("div + table");
  },
  isEqual() {
    return true;
  }
};