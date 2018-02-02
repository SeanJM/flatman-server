const el = require("../../index");

module.exports = {
  name : "is() (.parent .deep)",
  this() {
    var a = el({ class : "deep" });
    var p = el({ class : "parent" });
    p.append(el().append([ el(), el().append(el().append(a)) ]));
    return a.is(".parent .deep");
  },
  isEqual() {
    return true;
  }
};