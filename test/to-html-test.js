const el = require("../src/index");
const { Component, Html, render } = require("../src/index");

module.exports = function (test) {
  test("toHtml() (simple)", function () {
    var a = el("span");
    return render(a);
  }).isEqual("<span></span>\n");

  test("toHtml() (fragment)", function () {
    var a = el([
      el("fragment", [
        "string",
        el()
      ])
    ]);
    const str = render(a);
    return str;
  }).isEqual([
    "<div>",
    "  string",
    "  <div></div>",
    "</div>",
    ""
  ].join("\n"));

  test("toHtml() input[type=\"text\"]", function () {
    return render(
      el("input", { type: "text" })
    );
  }).isEqual(
    "<input type=\"text\">\n"
  );

  test("toHtml() xml", function () {
    return render(el("xml", {
      version: "1.0",
      encoding: "utf-8"
    }));
  }).isEqual(
    "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
  );

  test("toHtml() multiline text", function () {
    var a = el("div", [
      "this is a line\nthis is another line\nthis is a last line",
    ]);
    return render(a);
  }).isEqual([
    "<div>",
    "  this is a line",
    "  this is another line",
    "  this is a last line",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() text and node (succeed)", function () {
    const a = el([
      el("strong", ["text"]),
      "text"
    ]);
    return render(a);
  }).isDeepEqual([
    "<div>",
    "  <strong>",
    "    text",
    "  </strong>",
    "  text",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() text and node (preceed)", function () {
    const a = el([
      "text",
      el("strong", ["text"]),
    ]);
    return render(a);
  }).isDeepEqual([
    "<div>",
    "  text",
    "  <strong>",
    "    text",
    "  </strong>",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() (xlink:href)", function () {
    return render(el("use", { "xlink:href": "#id" }));
  }).isEqual("<use xlink:href=\"#id\"></use>\n");

  test("toHtml()", function () {
    var a = el([
      el({ className: "div-1" }, [
        el({ className: "div-1-1" }, [
          el("span", { className: "div-1-1-1" }, [
            el("span", { className: "div-1-1-1-1" })
          ])
        ]),
        el({ className: "div-1-2" })
      ]),
      el({ className: "div-2" }, [
        el({ className: "div-2-1" }),
        el({ className: "div-2-2" })
      ]),
      el({ className: "div-3" }, [
        el({ className: "div-3-1" }),
        el({ className: "div-3-2" })
      ])
    ]);
    return render(a);
  }).isEqual([
    "<div>",
    "  <div class=\"div-1\">",
    "    <div class=\"div-1-1\">",
    "      <span class=\"div-1-1-1\">",
    "        <span class=\"div-1-1-1-1\"></span>",
    "      </span>",
    "    </div>",
    "    <div class=\"div-1-2\"></div>",
    "  </div>",
    "  <div class=\"div-2\">",
    "    <div class=\"div-2-1\"></div>",
    "    <div class=\"div-2-2\"></div>",
    "  </div>",
    "  <div class=\"div-3\">",
    "    <div class=\"div-3-1\"></div>",
    "    <div class=\"div-3-2\"></div>",
    "  </div>",
    "</div>",
    ""
  ].join("\n"));

  test("toHtml() (Simple component)", function () {
    class Simple extends Component {
      render() {
        return el({ className: "splat" });
      }
    }
    const a = el(Simple);
    return render(a);
  }).isEqual([
    "<div class=\"splat\"></div>\n",
  ].join("\n"));

  test("toHtml() (Pure component)", function () {
    function Simple() {
      return el({ className: "splat" });
    }
    const a = el(Simple);
    return render(a);
  }).isEqual([
    "<div class=\"splat\"></div>\n",
  ].join("\n"));

  test("toHtml() (Simple nested div)", function () {
    class Simple extends Component {
      render(props) {
        return el({ className: "splat" }, props.children);
      }
    }
    const a = el(Simple, el());
    return render(a);
  }).isEqual([
    "<div class=\"splat\">",
    "  <div></div>",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() (lifecycle)", function () {
    const events = [false, false];

    class Simple extends Component {
      beforeComponentToHtml() {
        events[0] = true;
      }

      afterComponentToHtml() {
        events[1] = true;
      }

      render(props) {
        return el({ className: "splat" }, props.children);
      }
    }

    const a = el(Simple, el());
    render(a);
    return events;
  }).isDeepEqual([true, true]);

  test("toHtml() (custom element)", function () {
    return render(el(Html));
  }).isDeepEqual([
    "<!DOCTYPE HTML>",
    "<html>",
    "  <head>",
    "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
    "    <meta charset=\"UTF-8\">",
    "  </head>",
    "  <body></body>",
    "</html>",
    "",
  ].join("\n"));

  test("toHtml() (null)", function () {
    return render(el("div", [null]));
  }).isDeepEqual([
    "<div></div>",
    "",
  ].join("\n"));

  test("toHtml() (numbers)", function () {
    return render(el("div", [1, 2]));
  }).isDeepEqual([
    "<div>",
    "  1",
    "  2",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() (false)", function () {
    return render(el("div", [false]));
  }).isDeepEqual([
    "<div></div>",
    "",
  ].join("\n"));

  test("toHtml() (Empty object)", function () {
    return render(el("div", [{}]));
  }).isDeepEqual([
    "<div></div>",
    "",
  ].join("\n"));
};