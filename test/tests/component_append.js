const el = require("../../index");

module.exports = {
  name : "component append",
  this() {
    const str = "adfso8903q4kjglkjfsgkl;iu";

    el.create(str, {
      render() {
        return el("div", { class : "root" });
      }
    });

    const a = el(str);
    const b = el(str);
    const c = el(str);

    c.append([ a, b ]);
    return c.children()[0] === a;
  },
  isEqual() {
    return true;
  }
};