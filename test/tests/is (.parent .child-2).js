const el = require("../../index");

module.exports = {
  name : "is() (.parent .child-2)",
  this() {
    var a = el({ class : "parent" });
    var b = el({ class : "child-1" });
    var c = el({ class : "child-2" });
    a.append(b.append(c));
    return c.is(".parent .child-2");
  },
  isEqual() {
    return true;
  }
};