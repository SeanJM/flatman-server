const el = require("../../index");

module.exports = {
  name : "component tagName",
  this() {
    el.create("DF", {
      render() {
        return el("div");
      }
    });

    return el("DF").tagName;
  },
  isEqual() {
    return "DF";
  }
};