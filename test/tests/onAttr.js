const el = require("../../index");

module.exports = {
  name : "onAttr",
  this() {
    const a = el();

    el.onAttr("test", function (value) {
      this.addClass("test-" + value);
    });

    a.attr({ test : "test" });

    return a.attr("class").split(" ").indexOf("test-test") > -1;
  },
  isDeepEqual() {
    return true;
  }
};