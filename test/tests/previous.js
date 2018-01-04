const el = require("../../index");

module.exports = {
  name : "previous()",
  this() {
    var a = el();
    var b = el();
    var c = el();
    el([ b, c ]);
    return a.previous() === null && c.previous() === b;
  },
  isDeepEqual() {
    return true;
  }
};