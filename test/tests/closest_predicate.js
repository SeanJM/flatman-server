const el = require("../../index");


module.exports = {
  name : "closest() predicate",
  this() {
    var a = el("div", { className : "test-a" });
    var b = el("div", { className : "test-b" });

    a.append([ b ]);

    return b.closest(a => a.attributes.className.indexOf("test-a")) > -1;
  },
  isEqual() {
    return true;
  }
};