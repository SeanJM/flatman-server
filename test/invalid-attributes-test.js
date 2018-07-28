const el = require("../src/index");
const { render } = require("../src/index");

module.exports = function (test) {
  test("Invalid attributes - className = null", function () {
    const a = el("div", {
      className: null,
    });
    return render(a);
  })
    .isEqual([
      "<div/>",
      ""
    ].join("\n"));

  test("Invalid attributes - style = null", function () {
    const a = el("div", {
      style: null,
    });
    return render(a);
  })
    .isEqual([
      "<div/>",
      ""
    ].join("\n"));
};