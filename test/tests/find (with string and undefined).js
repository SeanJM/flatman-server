const el = require("../../index");

module.exports = {
  name : "find() (with string and undefined)",
  this() {
    var a = el();
    var b = el ({ class : "test" });

    a.append([ b, undefined, "string" ]);
    return a.find(".test") === b;
  },
  isEqual() {
    return true;
  }
};