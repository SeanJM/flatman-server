const el = require("../../index");

module.exports = {
  name : "attr()",
  this() {
    var a = el("div");
    a.attr({
      text : "1"
    });
    return a.attr("text");
  },
  isEqual() {
    return "1";
  }
};