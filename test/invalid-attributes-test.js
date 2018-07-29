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

  test("Invalid attributes - className = Array", function () {
    const a = el("div", {
      className: ["className"],
    });
    return render(a);
  })
    .isEqual([
      "<div class=\"className\"/>",
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

  test("Invalid attributes - className = object", function () {
    const a = el("div", {
      className: {},
    });
    return render(a);
  })
    .isEqual([
      "<div/>",
      ""
    ].join("\n"));

  test("Invalid attributes - style = object", function () {
    const a = el("div", {
      style: {
        display: "block",
        marginLeft: 15,
      },
    });
    return render(a);
  })
    .isEqual([
      "<div style=\"display: block; margin-left: 15px\"/>",
      ""
    ].join("\n"));
};