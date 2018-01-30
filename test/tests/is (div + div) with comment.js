const el = require("../../index");

module.exports = {
  name : "is() (div + div) with comment",
  this() {
    var a = el();
    var b = el();
    el([ a, el("comment", [ "a comment" ]), b ]);
    return b.is("div + div");
  },
  isEqual() {
    return true;
  }
};