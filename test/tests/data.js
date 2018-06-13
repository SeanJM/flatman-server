const el = require("../../index");

module.exports = {
  name: "data attribute",
  this() {
    var a = el({
      data: {
        id: "test"
      }
    });
    return a.attr("data-id");
  },
  isEqual() {
    return "test";
  }
};