const el = require("../../index");

module.exports = {
  name : "findAll()",
  this() {
    var a = el();

    var b = [
      el({ class : "test" }),
      el({ class : "test" }),
      el({ class : "test-2" })
    ];

    var c = [
      el({ class : "test" }),
      el({ class : "test" }),
      el({ class : "test-3" })
    ];

    var d;

    a.append(b[0]);
    b[1].append(c[0]);

    b[0].append(b[1]);
    c[0].append(c[1]);

    d = a.findAll(".test");
    return d.length === 4;
  },
  isEqual() {
    return true;
  }
};