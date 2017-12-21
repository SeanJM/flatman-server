const el = require("../../index");

module.exports = {
  name : "prepend()",
  this() {
    var a = el("div");
    var b = el("div");
    var c = el("div");

    a.append([ b ]);
    a.prepend([ c ]);

    return [
      a.childNodes[0] === c,
      a.childNodes[1] === b
    ];
  },
  isDeepEqual() {
    return [ true, true ];
  }
};