const el = require("../../index");

module.exports = {
  name : "defaultProps",
  this() {
    const a = "18hd";

    el.defaultProps({
      test : "test"
    });

    el.create(a, {
      render() {
        return el();
      }
    });

    return el(a).props.test;
  },
  isDeepEqual() {
    return "test";
  }
};