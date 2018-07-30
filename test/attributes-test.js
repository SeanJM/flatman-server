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
      "<div></div>",
      ""
    ].join("\n"));

  test("Invalid attributes - className = Array", function () {
    const a = el("div", {
      className: ["className"],
    });
    return render(a);
  })
    .isEqual([
      "<div class=\"className\"></div>",
      ""
    ].join("\n"));

  test("Invalid attributes - className with null, string, undefined", function () {
    const a = el("div", {
      className: ["className", null, undefined],
    });
    return render(a);
  })
    .isEqual([
      "<div class=\"className\"></div>",
      ""
    ].join("\n"));

  test("Invalid attributes - style = null", function () {
    const a = el("div", {
      style: null,
    });
    return render(a);
  })
    .isEqual([
      "<div></div>",
      ""
    ].join("\n"));

  test("Invalid attributes - className = object", function () {
    const a = el("div", {
      className: {},
    });
    return render(a);
  })
    .isEqual([
      "<div></div>",
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
      "<div style=\"display: block; margin-left: 15px\"></div>",
      ""
    ].join("\n"));

  test("Invalid attributes - viewBox", function () {
    const a = el("svg", {
      viewBox: "0 0 48 48"
    });
    return render(a);
  })
    .isEqual([
      "<svg viewBox=\"0 0 48 48\"></svg>",
      ""
    ].join("\n"));

  test("Invalid attributes - xlink:href", function () {
    const a = el("use", {
      "xlink:href": "#icon_menu"
    });
    return render(a);
  })
    .isEqual([
      "<use xlink:href=\"#icon_menu\"></use>",
      ""
    ].join("\n"));
};