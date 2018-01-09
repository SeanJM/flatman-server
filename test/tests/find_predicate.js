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

    return a.find(x => x.attributes.className[0] === "test-2") === c.getNode();
  },
  isEqual() {
    return true;
  }
};