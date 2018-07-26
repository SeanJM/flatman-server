require("source-map-support").install();

const el = require("../src/index");
const { Component, Html } = require("../src/index");

module.exports = function (test) {
  test("Component refs", function () {
    class DE extends Component {
      render() {
        return el([
          el({ ref: "x" }),
          el({ ref: "y" }, [
            el({ ref: "z" })
          ])
        ]);
      }
    }

    class DA extends Component {
      render() {
        return el(DE);
      }
    }

    let de = el(DE);
    let da = el(DA);

    return (
      de.refs.x.ref === "x" &&
      de.refs.y.ref === "y" &&
      de.refs.z.ref === "z" &&
      da.node.refs.x.ref === "x" &&
      da.node.refs.y.ref === "y" &&
      da.node.refs.z.ref === "z"
    );
  }).isEqual(true);

  test("Component refs (slot)", function () {
    class DE extends Component {
      render() {
        return el([
          el("a", { ref: "a" }),
          el("b", { ref: "b" }, [
            el("c", { ref: "c" }),
            el("slot", { ref: "slot" })
          ])
        ]);
      }
    }

    let de = el(DE, el("d", { ref: "d" }));
    return Object.keys(de.refs);
  }).isDeepEqual(["a", "b", "c", "slot", "d"]);

  test("Component refs (nested slot)", function () {
    let a = el("a");
    let b = el("b");

    let childSlot = el("child-slot", {
      ref: "slot"
    });

    class Parent extends Component {
      render() {
        return el("parent", [
          el("parent-slot", {
            ref: "slot"
          })
        ]);
      }
    }

    class Child extends Component {
      render() {
        return el(Parent, [
          childSlot,
          b
        ]);
      }
    }

    let de = el(Child, a);
    return de.toHtml();
  }).isDeepEqual([
    "<parent>",
    "  <parent-slot>",
    "    <child-slot>",
    "      <a></a>",
    "    </child-slot>",
    "    <b></b>",
    "  </parent-slot>",
    "</parent>"
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
    .isDeepEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "  </head>",
      "  <body>",
      "    <div class=\"test\"></div>",
      "    <div>",
      "      <div></div>",
      "    </div>",
      "    <div></div>",
      "  </body>",
      "</html>",
    ].join("\n"));

  test("el(\'HTML\') refs - with slot", function () {
    class HtmlWrapped extends Component {
      render() {
        let html = el(Html, [
          el("div", { className: "main-page", ref: "slot" }),
        ]);
        html.append(el("div", { className: "main-footer" }));
        return html;
      }
    }
    const page = el(HtmlWrapped, [el("div", { className: "main-page_child" })]);
    return page.toHtml();
  })
    .isDeepEqual([
      "<!DOCTYPE HTML>",
      "<html>",
      "  <head>",
      "    <meta http-equiv=\"X-UX-Compatible\" content=\"IE=edge,chrome=1\">",
      "    <meta charset=\"UTF-8\">",
      "  </head>",
      "  <body>",
      "    <div class=\"main-page\">",
      "      <div class=\"main-page_child\"></div>",
      "    </div>",
      "    <div class=\"main-footer\"></div>",
      "  </body>",
      "</html>",
    ].join("\n"));
};