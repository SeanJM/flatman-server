const el = require("../src/index");
const { Component, Html } = require("../src/index");

module.exports = function (test) {
  test("toHtml() (simple)", function () {
    var a = el("span");
    return a.toHtml();
  }).isEqual("<span/>\n");

  test("toHtml() (fragment)", function () {
    var a = el([
      el("fragment", [
        "string",
        el()
      ])
    ]);
    const str = a.toHtml();
    return str;
  }).isEqual([
    "<div>",
    "  string",
    "  <div/>",
    "</div>",
    ""
  ].join("\n"));

  test("toHtml() input[type=\"text\"]", function () {
    return el("input", { type: "text" }).toHtml();
  }).isEqual("<input type=\"text\">\n");

  test("toHtml() xml", function () {
    return el("xml", {
      version: "1.0",
      encoding: "utf-8"
    }).toHtml();
  }).isEqual("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");

  test("toHtml() multiline text", function () {
    var a = el("div", [
      "this is a line\nthis is another line\nthis is a last line",
    ]);
    return a.toHtml();
  }).isEqual("<div>\n  this is a line\n  this is another line\n  this is a last line\n</div>\n");

  test("toHtml() text and node (succeed)", function () {
    const a = el([
      el("strong", ["text"]),
      "text"
    ]);
    return a.toHtml();
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
    return a.toHtml();
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
    return el("use", {
      "xlink:href": "#id"
    }).toHtml();
  }).isEqual("<use xlink:href=\"#id\"/>\n");

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
    return a.toHtml();
  }).isEqual([
    "<div>",
    "  <div class=\"div-1\">",
    "    <div class=\"div-1-1\">",
    "      <span class=\"div-1-1-1\">",
    "        <span class=\"div-1-1-1-1\"/>",
    "      </span>",
    "    </div>",
    "    <div class=\"div-1-2\"/>",
    "  </div>",
    "  <div class=\"div-2\">",
    "    <div class=\"div-2-1\"/>",
    "    <div class=\"div-2-2\"/>",
    "  </div>",
    "  <div class=\"div-3\">",
    "    <div class=\"div-3-1\"/>",
    "    <div class=\"div-3-2\"/>",
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
    return a.toHtml();
  }).isEqual([
    "<div class=\"splat\"/>\n",
  ].join("\n"));

  test("toHtml() (Simple nested div)", function () {
    class Simple extends Component {
      render(props) {
        return el({ className: "splat" }, props.children);
      }
    }
    const a = el(Simple, el());
    return a.toHtml();
  }).isEqual([
    "<div class=\"splat\">",
    "  <div/>",
    "</div>",
    "",
  ].join("\n"));

  test("toHtml() (lifecycle)", function () {
    const events = [false, false];

    class Simple extends Component {
      beforeToHtml() {
        events[0] = true;
      }

      afterToHtml() {
        events[1] = true;
      }

      render(props) {
        return el({ className: "splat" }, props.children);
      }
    }

    const a = el(Simple, el());
    a.toHtml();
    return events;
  }).isDeepEqual([true, true]);

  test("toHtml() (custom element)", function () {
    return el(Html).toHtml();
  }).isDeepEqual([
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
};