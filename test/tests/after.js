const el = require("../../index");

el.create("xd", {
  render() {
    return el();
  }
});

module.exports = {
  name : "after()",
  this() {
    var a = el({ class : "a" });
    var b = el({ class : "b" });
    var c = el({ class : "c" });
    var d = el({ class : "d" });
    var f = el({ class : "f" });
    var e = el("xd");
    var g = el({ class : "g" });
    var h = el({ class : "h" });

    c.append([a, d]);
    e.append([ f, h ]);

    b.after(a);
    g.after(f);

    return c.childNodes[1] === b && e.children()[1] === g;
  },
  isEqual() {
    return true;
  }
};