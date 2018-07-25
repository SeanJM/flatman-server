const el = require("../index");
const { Component } = require("../index");
const fs = require("fs");
const path = require("path");

module.exports = function (test) {
  test("toHtml() (fragment)", function () {
    var a = el([
      el("fragment", [
        "string",
        el(),
        el(),
        el()
      ])
    ]);
    return a.toHtml();
  }).isEqual("<div>\n  string<div></div><div></div><div></div>\n</div>");

  test("toHtml() input[type=\"text\"]", function () {
    return el("input", { type: "text" }).toHtml();
  }).isEqual("<input type=\"text\">");

  test("toHtml() xml", function () {
    return el("xml", {
      version: "1.0",
      encoding: "utf-8"
    }).toHtml();
  }).isEqual("<?xml version=\"1.0\" encoding=\"utf-8\"?>");

  test("toHtml() multiline text", function () {
    var a = el("div", [
      "this is a line\nthis is another line\nthis is a last line",
    ]);
    return a.toHtml();
  }).isEqual("<div>\n  this is a line\n  this is another line\n  this is a last line\n</div>");

  test("toHtml() text and node", function () {
    const a = el([
      el("strong", ["text"]),
      "text"
    ]);
    const b = el([
      "text",
      el("strong", ["text"]),
    ]);
    return [a.toHtml(), b.toHtml()];
  }).isDeepEqual([
    "<div>\n  <strong>text</strong>text\n</div>",
    "<div>\n  text<strong>text</strong>\n</div>"
  ]);

  test("toHtml() (xlink:href)", function () {
    return el("use", {
      "xlink:href": "#id"
    }).toHtml();
  }).isEqual("<use xlink:href=\"#id\"></use>");

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
  }).isEqual(fs.readFileSync(path.resolve("test/assets/toHtml.html"), "utf8"));

  test("toHtml() (Component)", function () {
    class Splat extends Component {
      render() {
        return el({ className: "splat" });
      }
    }

    const a = el([
      el({ className: "div-1" }, [
        el(Splat, [
          el("span", {
            className: "splat-child"
          })
        ])
      ])
    ]);

    return a.toHtml();
  }).isEqual([
    "<div>",
    "  <div class=\"div-1\">",
    "    <div class=\"splat\">",
    "      <span class=\"splat-child\"></span>",
    "    </div>",
    "  </div>",
    "</div>",
  ].join("\n"));

  test("toHtml() (simple)", function () {
    var a = el("span");
    return a.toHtml();
  }).isEqual("<span></span>");
};