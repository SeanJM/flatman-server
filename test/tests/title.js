const el = require("../../index");

module.exports = {
  name : "title()",
  this() {
    var a = el("HTML");
    a.title("test");
    return a.refs.head.find("title").childNodes[0] === "test";
  },
  isEqual() {
    return true;
  }
};