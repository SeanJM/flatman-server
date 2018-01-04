const el = require("../../index");

module.exports = {
  name : "is() (.a div + div)",
  this() {
    var a = el();
    var b = el();
    el({ class : "a" }, [ a, b ]);
    return b.is(".a div + div") && !b.is(".a") && !a.is(".a div + div");
  },
  isEqual() {
    return true;
  }
};