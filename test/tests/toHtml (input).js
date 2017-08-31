const el = require("../../index").el;

module.exports = {
  name : "toHtml() input[type=\"text\"]",
  this() {
    return el("input", { type: "text" }).toHtml();
  },
  isEqual() {
    return "<input type=\"text\">\n";
  }
};