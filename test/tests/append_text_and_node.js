const el = require("../../index");

module.exports = {
  name : "append text and node",
  this() {
    const a = el("div", [ "text", el("div") ]);
    return a.childNodes[0] === "text" && a.childNodes[1].tagName === "div";
  },
  isEqual() {
    return true;
  }
};