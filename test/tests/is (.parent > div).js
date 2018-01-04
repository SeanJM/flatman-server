const el = require("../../index");

module.exports = {
  name : "is() (.parent > div)",
  this() {
    var a = el();
    var b = el("table");
    var c = el({ class : "test" });
    el({ class : "parent" }, [ a, b, c ]);
    return a.is(".parent > div") && b.is(".parent > table") && c.is(".parent > .test");
  },
  isEqual() {
    return true;
  }
};