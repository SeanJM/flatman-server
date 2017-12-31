const el = require("../../index");

module.exports = {
  name : "after()",
  this() {
    var a = el({ class : "a" });
    var b = el({ class : "b" });
    var c = el({ class : "c" });
    var d = el({ class : "d" });
    c.append([a, d]);
    b.after(a);
    console.log(c.childNodes[1]);
    return c.childNodes[1] === b;
  },
  isEqual() {
    return true;
  }
};