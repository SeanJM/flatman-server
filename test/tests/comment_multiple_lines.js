const el = require("../../index");

module.exports = {
  name : "comment (multiple lines)",
  this() {
    const a = el("comment", [
      "line 1",
      "line 2"
    ]);
    return a.toHtml();
  },
  isEqual() {
    return (
      "<!--\n" +
      "  line 1\n" +
      "  line 2\n" +
      "-->\n"
    );
  }
};