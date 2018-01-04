const el = require("../../index");

module.exports = {
  name : "replaceWith()",
  this() {
    var a = el();
    var b = el();
    var c = el();

    var d = el({ class : "d" });
    var e = el("table", { class : "e" });

    a.append([ b ]);
    b.replaceWith(c);
    d.replaceWith(e);

    return [ a.childNodes[0] === c, a.childNodes.length, d.tagName === "table" && d.attributes.className[0] === "e" ];
  },
  isDeepEqual() {
    return [ true, 1, true ];
  }
};