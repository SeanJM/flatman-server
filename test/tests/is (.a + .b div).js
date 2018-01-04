const el = require("../../index");

module.exports = {
  name : "is() (.a + .b div)",
  this() {
    var a = el("table", {
      style : {
        fontFamily : "Arial"
      },
      class : "typography_p"
    });

    var b = el("table", {
      style : {
        fontFamily : "Arial"
      },
      class : "typography_p"
    });

    var c = el("td");

    el([
      a,
      b.append(
        el("tr", [ c ])
      ),
      el()
    ]);

    return c.is(".typography_p + .typography_p td");
  },
  isEqual() {
    return true;
  }
};