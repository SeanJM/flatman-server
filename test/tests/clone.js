const el = require("../../index");

module.exports = {
  name : "clone()",
  this() {
    var a = el("div", [ el(), el() ]);
    var b = a.clone();
    return a !== b && a.children().length === a.children().length;
  },
  isDeepEqual() {
    return true;
  }
};