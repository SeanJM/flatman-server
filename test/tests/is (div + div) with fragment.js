const el = require("../../index");

module.exports = {
  name : "is() (div + div) with fragment",
  this() {
    var a = el();
    var b = el();
    var c = el("fragment", [ a ]);
    var d = el("fragment", [ b ]);

    el([ c, el("comment", [ "comment" ]), d ]);

    return b.is("div + div");
  },
  isEqual() {
    return true;
  }
};