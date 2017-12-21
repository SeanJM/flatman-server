const el = require("../../index");

module.exports = {
  name : "children()",
  this() {
    var a = el("div");
    var b = el("div", { className : "test" });
    var c = el("div", { className : "test" });
    var d = el("div", { className : "test" });
    var res = [];

    a.append([ b ]);
    res.push(a.children().length);
    a.append([ c ]);
    res.push(a.children().length);
    a.append([ d ]);
    res.push(a.children().length);

    b.append([ c.append([ d ]) ]);
    res.push(a.children().length);

    return res;
  },
  isDeepEqual() {
    return [ 1, 2, 3, 1 ];
  }
};