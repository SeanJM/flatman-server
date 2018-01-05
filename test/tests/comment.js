const el = require("../../index");

module.exports = {
  name : "comment",
  this() {
    const a = el("comment", [ "test" ]);
    return a.toHtml();
  },
  isEqual() {
    return "<!--test-->\n";
  }
};