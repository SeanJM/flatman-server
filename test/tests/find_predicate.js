const el = require("../../index");

module.exports = {
  name : "find() (predicate)",
  this() {
    el.create("D", {
      render(opt) {
        return el("div", { class : opt.class });
      }
    });

    var a = el("div");
    var b = el("div", { class : "test" });
    var c = el("D", { class : "test-2" });

    a.append([
      b.append([ c ])
    ]);

    return a.find(a => a.tagName === "D")[0] === c;
  },
  isEqual() {
    return true;
  }
};