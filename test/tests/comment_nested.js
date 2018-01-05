const el = require("../../index");

module.exports = {
  name : "comment (nested)",
  this() {
    const a = el("comment", [
      "line 1",
      el("comment", [ "line 2" ])
    ]);
    return a.toHtml();
  },
  isEqual() {
    return (
      "<!--line 1\n" +
      "      line 2-->\n"
    );
  }
};