const el = require("../../index");

module.exports = {
  name : "attr()",
  this() {
    var a = el();
    var b = el();
    a.attr({
      text : "1"
    });
    b.attr({
      id : "id"
    });
    return [ a.attr("text"), b.attr("id") ];
  },
  isDeepEqual() {
    return [ "1", "id" ];
  }
};