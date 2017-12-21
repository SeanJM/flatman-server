const el = require("../../index");

module.exports = {
  name : "component text",
  this() {
    el.create("XY", {
      text() {
        return this.node.text();
      },
      render() {
        return el("div");
      }
    });

    let a = el("XY", [ "loophole" ]);

    return a.text();
  },
  isEqual() {
    return "loophole";
  }
};