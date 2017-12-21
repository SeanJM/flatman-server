const el = require("../../index");

module.exports = {
  name : "off()",
  this() {
    var result = [];

    function onClick() {
      toggle = !toggle;
    }

    var toggle = false;
    var a = el("div", { onClick : onClick });

    a.trigger("click");
    result.push(toggle);

    a.off("click");
    a.trigger("click");
    result.push(toggle);

    a.on("click", onClick);
    a.trigger("click");
    result.push(toggle);

    a.off("click", onClick);
    a.trigger("click");
    result.push(toggle);

    return result;
  },
  isDeepEqual() {
    return [ true, true, false, false ];
  }
};