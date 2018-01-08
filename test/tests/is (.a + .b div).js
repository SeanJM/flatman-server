const el = require("../../index");

module.exports = {
  name : "is() (.a + .b div)",
  this() {
    var a = el("table", {
      style : {
        fontFamily : "Arial"
      },
      class : "t_p"
    });

    var b = el("table", {
      style : {
        fontFamily : "Arial"
      },
      class : "t_p"
    });

    var c = el("td");

    el([
      a,
      b.append(
        el("tr", [ c ])
      ),
      el()
    ]);

    return (
      c.is(".t_p + .t_p td") &&
      !b.is(".t_p + .t_p td")
    );
  },
  isEqual() {
    return true;
  }
};