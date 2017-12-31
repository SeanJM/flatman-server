const el  = require("../../index");
const str = "adfso8903q4kjglkjfsgkl;iu";

el.create(str, {
  render() {
    return el("div", { class : "root" });
  }
});

module.exports = {
  name : "component append",
  this() {
    const a = el(str);
    const b = el(str);
    const c = el(str);
    c.append([ a, b ]);
    return c.children()[0] === a.getNode();
  },
  isEqual() {
    return true;
  }
};