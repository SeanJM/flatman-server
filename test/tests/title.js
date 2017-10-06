const el = require("../../index").el;

module.exports = {
  name : "title()",
  this() {
    var a = el("HTML");
    a.title("test");
    return a.refs.head.find("title")[0].childNodes[0] === "test";
  },
  isEqual() {
    return true;
  }
};