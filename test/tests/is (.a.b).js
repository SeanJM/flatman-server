const el = require("../../index");

module.exports = {
  name : "is() (.a.b)",
  this() {
    const a = el({ class : "a b" });
    const b = el({ class : "b" });
    return a.is(".a.b") && !b.is(".a.b");
  },
  isEqual() {
    return true;
  }
};