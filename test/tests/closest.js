const el = require("../../index");

module.exports = {
  name : "closest()",
  this() {
    var a = el("div");
    var b = el("div", { class : "test" });
    var c = el("div", { class : "test" });
    var d = el("div", { class : "test" });

    a.append([ b.append([ c.append([ d ]) ]) ]);

    return d.closest(".test") === c;
  },
  isEqual() {
    return true;
  }
};