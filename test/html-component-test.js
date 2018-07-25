const el = require("../src/index");
const { Component, Html } = require("../src/index");
const fs = require("fs");
const path = require("path");

module.exports = function (test) {
  test("HTML comments", function () {
    const c = el().html("<!--comment-->").children()[0];
    const a = el(Html, [c]);
    const str = a.toHtml();
    return str;
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "  </head>",
      "  <body>",
      "    <!--comment-->",
      "  </body>",
      "</html>"
    ].join("\n"));

  test("el(\'HTML\') refs", function () {
    let html = el(Html, [
      el("div", { ref: "div" }),
      el("div", [el("div")]),
      el("div")
    ]);
    html.refs.div.addClass("test");
    return html.toHtml();
  })
    .isDeepEqual(function () {
      return fs.readFileSync(
        path.resolve("test/assets/el(HTML)_refs.html"),
        "utf8"
      );
    });

  test("el(Html) - with component", function () {
    class X extends Component {
      render() {
        return el({ class: "component" });
      }
    }

    class Y extends Component {
      render() {
        return el(Html, [
          el(),
          el([el()]),
          el()
        ]);
      }
    }

    const a = el(Y);
    a.append([el(X)]);
    return a.toHtml();
  }).isEqual([
    "<!DOCTYPE HTML>",
    "<html>",
    "  <head>",
    "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
    "    <meta charset=\"UTF-8\">",
    "  </head>",
    "  <body>",
    "    <div></div>",
    "    <div>",
    "      <div></div>",
    "    </div>",
    "    <div></div>",
    "    <div class=\"component\"></div>",
    "  </body>",
    "</html>"
  ].join("\n"));

  test("el(Html)", function () {
    const a = el(Html, {
      scripts: "test.js",
      styles: "style.css"
    }, [
      el("div"),
    ]);
    return a.toHtml();
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "    <script src=\"test.js\"></script>",
      "    <link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">",
      "  </head>",
      "  <body>",
      "    <div></div>",
      "  </body>",
      "</html>"
    ].join("\n"));

  test("el(Html) - styles: null", function () {
    const a = el(Html, {
      styles: null
    });
    return a.toHtml();
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "  </head>",
      "  <body></body>",
      "</html>"
    ].join("\n"));

  test("el(Html) - title", function () {
    const a = el(Html, {
      title: "test"
    });
    return a.toHtml();
  })
    .isEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "    <title>test</title>",
      "  </head>",
      "  <body></body>",
      "</html>"
    ].join("\n"));

  test("title()", function () {
    const a = el(Html);
    a.title("test");
    return a.refs.head.find("title").childNodes[0] === "test";
  }).isEqual(true);
};