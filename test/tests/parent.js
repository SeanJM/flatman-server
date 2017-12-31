const el = require("../../index");
const str = "fhk823hJHd";

el.create(str, {
  render() {
    return el();
  }
});

module.exports = {
  name : "parent()",
  this() {
    var a = el("div");
    var b = el("div");
    var c = el(str);
    var d = el();

    a.append([ b ]);
    c.append([ d ]);

    return [
      b.parent() === a, d.parent() === c.getNode()
    ];
  },
  isDeepEqual() {
    return [ true, true ];
  }
};