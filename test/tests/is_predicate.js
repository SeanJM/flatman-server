const el = require("../../index");

module.exports = {
  name : "is() Predicate",
  this() {
    var a = el("div", { className : "test-a", id : "my-id", dataTest : "my-test" });
    var b = el("div", { className : "test-b" });
    var c = el("div", { id : "test" });
    return [
      a.is(a => a.attributes.className.indexOf("test-a") > -1),
      b.is(a => a.attributes.className.indexOf("test-b") > -1),
      c.is(a => a.attr("id") === "test"),
    ];
  },
  isDeepEqual() {
    return [ true, true, true ];
  }
};