const el = require("../../index");

module.exports = {
  name : "toHtml() xml",
  this() {
    return el("xml", {
      version  : "1.0",
      encoding : "utf-8"
    }).toHtml();
  },
  isEqual() {
    return "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
  }
};
