const el = require("../../index");

module.exports = {
  name : "before()",
  this() {
    var a = el({ class : "a" });
    var b = el({ class : "b" });
    var c = el({ class : "c" });
    var d = el({ class : "d" });

    d.append(a);
    d.append(b);
    b.before(c);

    return b.previous() === c;
  },
  isEqual() {
    return true;
  }
};