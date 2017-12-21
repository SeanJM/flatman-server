const el = require("../../index");

module.exports = {
  name : "find() (component)",
  this() {
    el.create("E", {
      render(props) {
        return el("div", { class : props.class });
      }
    });

    var a = el("div");
    var b = el("div", { class : "test" });
    var c = el("E", { class : "test-2" });

    a.append([
      b.append([ c ])
    ]);

    return a.find(node => node.tagName === "E")[0] === c;
  },
  isEqual() {
    return true;
  }
};