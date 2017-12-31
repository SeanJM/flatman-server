const el = require("../../index");

el.create("xd", {
  render(props) {
    return el({ class : props.class });
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

    var i = el("xd", { class : "i" });
    var j = el("xd", { class : "j" });
    var k = el("xd", { class : "k" });

    c.append([a, d]);
    e.append([ f, h ]);
    j.append(i);

    b.after(a);
    g.after(f);
    k.after(i);

    return c.childNodes[1] === b && e.children()[1] === g && j.children()[1] === k.getNode();
  },
  isEqual() {
    return true;
  }
};