const el = require("../../index");

module.exports = {
  name : "find()",
  this() {
    var a = el();
    var b = el ({ class : "test" });

    a.append([ b ]);
    return a.find(".test") === b && !a.find(".nothing");
  },
  isEqual() {
    return true;
  }
};