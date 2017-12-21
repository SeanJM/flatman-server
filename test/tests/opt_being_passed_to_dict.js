const el = require("../../index");

module.exports = {
  name : "opt passed to 'dict'",
  this() {
    el.create("C");
    var c = el("C", { option : 1 });
    return c.props.option === 1;
  },
  isEqual() {
    return true;
  }
};