const el = require("../../index");

module.exports = {
  name : "is() (.a div + div)",
  this() {
    var a = el();
    var b = el();
    var c = el("table");
    el({ class : "a" }, [ a, b.append(c) ]);
    return b.is(".a div + div") && !b.is(".a") && !a.is(".a div + div") && !c.is(".a div + div");
  },
  isEqual() {
    return true;
  }
};