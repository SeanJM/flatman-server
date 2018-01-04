const el = require("../../index");

module.exports = {
  name : "is() (invalid element)",
  this() {
    var a = el("div");
    var b = el("div");
    a.append([ b, "string" ]);
    return !b.is("table + div") && !b.is("table ~ div") && !b.is("table > div");
  },
  isDeepEqual() {
    return false;
  }
};