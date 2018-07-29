const el = require("../src/index");
const { Component, Html, render } = require("../src/index");

module.exports = function (test) {
  test("el(Html) - with component", function () {
    class X extends Component {
      render() {
        return el({ class: "component" });
      }
    }

    class Y extends Component {
      render(props) {
        return el(Html, [
          el(),
          el([el()]),
          el()
        ].concat(props.children));
      }
    }

    const a = el(Y, el(X));
    return render(a);
  }).isEqual([
    "<!DOCTYPE HTML>",
    "<html>",
    "  <head>",
    "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
    "    <meta charset=\"UTF-8\">",
    "  </head>",
    "  <body>",
    "    <div/>",
    "    <div>",
    "      <div/>",
    "    </div>",
    "    <div/>",
    "    <div class=\"component\"/>",
    "  </body>",
    "</html>",
    ""
  ].join("\n"));

  test("el(Html)", function () {
    const a = el(Html, {
      scripts: "test.js",
      styles: "style.css"
    }, [
      el("div"),
    ]);
    return render(a);
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "    <link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\">",
      "  </head>",
      "  <body>",
      "    <div/>",
      "    <script src=\"test.js\"/>",
      "  </body>",
      "</html>",
      ""
    ].join("\n"));

  test("el(Html) - styles: null", function () {
    const a = el(Html, {
      styles: null
    });
    return render(a);
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "  </head>",
      "  <body/>",
      "</html>",
      "",
    ].join("\n"));

  test("el(Html) - title", function () {
    const a = el(Html, {
      title: "test"
    });
    return render(a);
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "    <title>",
      "      test",
      "    </title>",
      "  </head>",
      "  <body/>",
      "</html>",
      ""
    ].join("\n"));
};