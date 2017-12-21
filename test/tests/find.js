const el = require("../../index");

module.exports = {
  name : "find()",
  this() {
    var a = el("div");
    var b = el ("div", { class : "test" });

    a.append([ b ]);

    return a.find(".test")[0] === b;
  },
  isEqual() {
    return true;
  }
};