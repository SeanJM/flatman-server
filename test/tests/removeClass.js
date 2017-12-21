const el = require("../../index");

module.exports = {
  name : "removeClass()",
  this() {
    var a = el("div", { className : "remove dont-remove" });
    a.removeClass("remove");
    return a.attributes.className;
  },
  isDeepEqual() {
    return [ "dont-remove" ];
  }
};