import "source-map-support/register";
import tinyTest from "tiny-test";
import el, { Component } from "../src/index";
import { Html } from "../src/components";
import fs from "fs";
import path from "path";

module.exports = tinyTest(function (test, load) {
  class MyComponent extends Component {
    render() {
      return el("div", { className: "a" });
    }
  }

  function PureComponent(props) {
    return el("div", { className: props.className });
  }

  test("createNode", function () {
    return el("div", { class: "a" }).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      style: {},
      className: ["a"],
      disabled: null,
      name: null
    },
    childNodes: []
  });

  test("Create component", function () {
    let result = el(MyComponent, { className: "a" }).toJSON();
    return result;
  }).isDeepEqual({
    tagName: MyComponent,
    props: { className: "a" },
    refs: {},
    node: {
      tagName: "div",
      attributes: {
        style: {},
        className: ["a"],
        disabled: null,
        name: null
      },
      childNodes: []
    }
  });

  test("Create component (pure function)", function () {
    let result = el(PureComponent, { className: "a" }).toJSON();
    return result;
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      style: {},
      className: ["a"],
      disabled: null,
      name: null
    },
    childNodes: []
  });

  test("Node: addClass()", function () {
    const a = el("div");
    a.addClass("test");
    return a.attributes.className.indexOf("test") > -1;
  }).isEqual(true);

  test("Component: addClass()", function () {
    const a = el(MyComponent);
    a.addClass("test");
    return a.node.attributes.className.indexOf("test") > -1;
  }).isEqual(true);

  test("Node: append()", function () {
    const a = el();
    const b = el();
    const c = el();
    a.append([b, c]);
    return a.childNodes.length;
  }).isEqual(2);

  test("Component: append()", function () {
    const a = el(MyComponent);
    const b = el();
    const c = el();
    a.append([b, c]);
    return a.node.childNodes.length;
  }).isEqual(2);

  test("Node: append text and node", function () {
    const a = el(["text", el()]);
    return (
      a.childNodes[0] === "text" &&
      a.childNodes[1].tagName === "div"
    );
  }).isEqual(true);

  test("Component: append text and node", function () {
    const a = el(MyComponent, ["text", el()]);
    return (
      a.children()[0] === "text" &&
      a.children()[1].tagName === "div"
    );
  }).isEqual(true);

  test("after()", function () {
    const a = el({ className: "a" });
    const b = el({ className: "b" });
    const c = el({ className: "c" });
    const d = el({ className: "d" });
    const f = el({ className: "f" });

    const e = el(MyComponent);
    const g = el({ className: "g" });
    const h = el({ className: "h" });

    const i = el(MyComponent, { className: "i" });
    const j = el(MyComponent, { className: "j" });
    const k = el(MyComponent, { className: "k" });

    c.append([a, d]);
    e.append([f, h]);
    j.append(i);

    b.after(a);
    g.after(f);
    k.after(i);

    return c.childNodes[1] === b && e.children()[1] === g && j.children()[1] === k.getNode();
  }).isEqual(true);

  test("appendTo", function () {
    const a = el();
    const b = el();
    b.appendTo(a);
    return [a.childNodes.length, a.childNodes[0] === b];
  })
    .isDeepEqual([1, true]);

  test("class (array)", function () {
    const a = el();

    const b = el({
      className: ["this"].concat("array")
    });

    a.attr({
      className: ["this", "array"]
    });

    return [a.attr("class"), b.attr("class")];
  }).isDeepEqual(["this array", "this array"]);

  test("attr()", function () {
    const a = el();
    const b = el();

    a.attr({
      text: "1"
    });

    b.attr({
      id: "id"
    });

    return [a.attr("text"), b.attr("id")];
  }).isDeepEqual(["1", "id"]);

  test("before()", function () {
    const a = el({ class: "a" });
    const b = el({ class: "b" });
    const c = el({ class: "c" });
    const d = el({ class: "d" });

    d.append(a);
    d.append(b);
    b.before(c);

    return b.previous() === c;
  }).isEqual(true);

  test("children()", function () {
    const a = el();
    const b = el({ className: "test" });
    const c = el({ className: "test" });
    const d = el({ className: "test" });
    const res = [];

    a.append([b]);
    res.push(a.children().length);
    a.append([c]);
    res.push(a.children().length);
    a.append([d]);
    res.push(a.children().length);

    b.append([c.append([d])]);
    res.push(a.children().length);

    return res;
  }).isDeepEqual([1, 2, 3, 1]);

  test("children() (replace)", function () {
    const results = [];
    const a = [el(), el(), el(), el()];
    const b = [el(), el(), el(), el()];
    const c = el(a);

    results.push(
      c.children().length === 4,
      c.children(0) === a[0],
      c.children(1) === a[1],
      c.children(2) === a[2],
      c.children(3) === a[3]
    );

    c.children(b);

    results.push(
      c.children().length === 8,
      c.children(0) === a[0],
      c.children(1) === a[1],
      c.children(2) === a[2],
      c.children(3) === a[3],
      c.children().length === 4,
      c.children(0) === b[0],
      c.children(1) === b[1],
      c.children(2) === b[2],
      c.children(3) === b[3]
    );

    return results;
  }).isDeepEqual([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true
  ]);

  test("clone()", function () {
    const a = el([el(), el()]);
    const b = a.clone();
    return (
      a !== b &&
      a.children().length === a.children().length
    );
  }).isEqual(true);

  test("closest() (predicate)", function () {
    const a = el({ className: "test-a" });
    const b = el({ className: "test-b" });

    a.append([b]);

    return b.closest(a => a.attributes.className.indexOf("test-a")) > -1;
  }).isEqual(true);

  test("closest()", function () {
    const a = el();
    const b = el({ class: "test" });
    const c = el({ class: "test" });
    const d = el({ class: "test" });

    a.append([b.append([c.append([d])])]);

    return d.closest(".test") === c;
  }).isEqual(true);

  test("comment", function () {
    const a = el("comment", ["test"]);
    return a.toHtml();
  }).isEqual("<!--test-->\n");

  test("comment (multiple lines)", function () {
    const a = el("comment", [
      "line 1",
      "line 2"
    ]);
    return a.toHtml();
  }).isEqual(
    "<!--line 1\n" +
    "    line 2-->\n"
  );

  test("comment (nested)", function () {
    const a = el("comment", [
      "line 1",
      el("comment", ["line 2"])
    ]);
    return a.toHtml();
  }).isEqual(
    "<!--line 1\n" +
    "      line 2-->\n"
  );

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

  test("data attribute", function () {
    const a = el({
      data: {
        id: "test"
      }
    });
    return a.attr("data-id");
  }).isEqual("test");

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

  test("el(Html) onMount", function () {
    let a = [false, false];

    class T extends Component {
      render() {
        return el("div", {
          class: "t",
          onMount: () => {
            a[1] = true;
          }
        });
      }
    }

    el(Html, [
      el(T),
      el("div", {
        onMount: () => {
          a[0] = true;
        }
      }),
      el("script", {
        src: "test.js"
      }),
      el("link", {
        rel: "stylesheet",
        href: "style.css"
      })
    ]).toHtml();

    return a[0] === a[1];
  }).isEqual(true);

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
    console.log(a.toHtml());
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

  test("find() (with string and undefined)", function () {
    const a = el();
    const b = el({ class: "test" });
    a.append([b, undefined, "string"]);
    return a.find(".test") === b;
  }).isEqual(true);

  test("find() (component)", function () {
    class E extends Component {
      render(props) {
        return el({ className: props.className });
      }
    }

    const a = el("div");
    const b = el("div", { className: "test" });
    const c = el(E, { className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return (
      a.find(".test-2") === c.getNode() &&
      a.find(".test-3") === false
    );
  }).isEqual(true);

  test("find() (nested)", function () {
    const a = el();
    const b = el({ className: "test" });
    const c = el({ className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return a.find(".test .test-2") === c;
  }).isEqual(true);

  test("find() (predicate)", function () {
    class D extends Component {
      render(props) {
        return el({ className: props.className });
      }
    }

    const a = el();
    const b = el({ className: "test" });
    const c = el(D, { className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return a.find(x => x.attributes.className[0] === "test-2") === c.getNode();
  }).isEqual(true);

  test("find()", function () {
    const a = el();
    const b = el({ class: "test" });
    a.append([b]);
    return a.find(".test") === b && !a.find(".nothing");
  }).isEqual(true);

  test("findAll()", function () {
    const a = el();

    const b = [
      el({ class: "test" }),
      el({ class: "test" }),
      el({ class: "test-2" })
    ];

    const c = [
      el({ class: "test" }),
      el({ class: "test" }),
      el({ class: "test-3" })
    ];

    let d;

    a.append(b[0]);
    b[1].append(c[0]);

    b[0].append(b[1]);
    c[0].append(c[1]);

    d = a.findAll(".test");
    return d.length === 4;
  }).isEqual(true);

  test("html()", function () {
    const a = el("div");
    a.html("<span></span>");
    return [a.children()[0].tagName, a.html()];
  }).isDeepEqual(["span", "<span></span>\n"]);

  test("is() (.a + .b div)", function () {
    const a = el("table", {
      style: {
        fontFamily: "Arial"
      },
      class: "t_p"
    });

    const b = el("table", {
      style: {
        fontFamily: "Arial"
      },
      class: "t_p"
    });

    const c = el("td");

    el([
      a,
      b.append(
        el("tr", [c])
      ),
      el()
    ]);

    return (
      c.is(".t_p + .t_p td") &&
      !b.is(".t_p + .t_p td")
    );
  }).isEqual(true);

  test("is() (.a div + div)", function () {
    const a = el();
    const b = el();
    const c = el("table");
    el({ class: "a" }, [a, b.append(c)]);
    return (
      b.is(".a div + div") &&
      !b.is(".a") &&
      !a.is(".a div + div") &&
      !c.is(".a div + div")
    );
  }).isEqual(true);

  test("is() (.a.b)", function () {
    const a = el({ class: "a b" });
    const b = el({ class: "b" });
    return a.is(".a.b") && !b.is(".a.b");
  }).isEqual(true);

  test("is() (.class1.class2)", function () {
    const a = el({ class: "class1 class2" });
    return (
      a.is(".class1.class2") &&
      a.is(".class2.class1") &&
      a.is(".class2") &&
      a.is(".class1")
    );
  }).isEqual(true);

  test("is() (.parent .child-2)", function () {
    const a = el({ class: "parent" });
    const b = el({ class: "child-1" });
    const c = el({ class: "child-2" });
    a.append(b.append(c));
    return c.is(".parent .child-2");
  }).isEqual(() => true);

  test("is() (.parent .deep)", function () {
    const a = el({ class: "deep" });
    const p = el({ class: "parent" });
    p.append(el().append([el(), el().append(el().append(a))]));
    return a.is(".parent .deep");
  }).isEqual(true);

  test("is() (.parent > div)", function () {
    const a = el();
    const b = el("table");
    const c = el({ class: "test" });
    el({ class: "parent" }, [a, b, c]);
    return (
      a.is(".parent > div") &&
      b.is(".parent > table") &&
      c.is(".parent > .test")
    );
  }).isEqual(true);

  test("is() (+)", function () {
    const a = el("html", {
      style: {},
      class: "",
      disabled: null,
      name: null,
      xmlns: "http://www.w3.org/1999/xhtml"
    });
    return a.is("+");
  }).isEqual(false);

  test("is() (div + div + div)", function () {
    const a = el();
    const b = el();
    const c = el();
    const d = el();
    d.append([a, b, c]);
    return c.is("div + div + div");
  }).isEqual(true);

  test("is() (div + div) with comment", function () {
    const a = el();
    const b = el();
    el([a, el("comment", ["a comment"]), b]);
    return b.is("div + div");
  }).isEqual(true);

  test("is() (div + div) with fragment", function () {
    const a = el();
    const b = el();
    const c = el("fragment", [a]);
    const d = el("fragment", [b]);

    el([c, el("comment", ["comment"]), d]);

    return b.is("div + div");
  }).isEqual(true);

  test("is() (div + div)", function () {
    const a = el();
    const b = el();
    el([a, b]);
    return b.is("div + div");
  }).isEqual(true);

  test("is() (div ~ div)", function () {
    const a = el();
    const b = el("table");
    const c = el();
    el([a, b, c]);
    return (
      c.is("div ~ div") &&
      !b.is("table + table") &&
      b.is("div + table")
    );
  }).isEqual(true);

  test("is() (invalid element)",
    el("div").is("table"))
    .isEqual(false);

  test("is() (is string sibling)", function () {
    const a = el();
    const b = el();
    a.append([b, "string"]);
    return [
      b.is("table + div"),
      b.is("table ~ div"),
      b.is("table > div")
    ];
  }).isDeepEqual([false, false, false]);

  test("is() Predicate", function () {
    const a = el({ className: "test-a", id: "my-id", dataTest: "my-test" });
    const b = el({ className: "test-b" });
    const c = el({ id: "test" });
    return [
      a.is(a => a.attributes.className.indexOf("test-a") > -1),
      b.is(a => a.attributes.className.indexOf("test-b") > -1),
      c.is(a => a.attr("id") === "test"),
    ];
  }).isDeepEqual([true, true, true]);

  test("is()", function () {
    var a = el({ className: "test", id: "my-id", dataTest: "my-test" });
    var b = el({ className: "test" });
    var c = el({ id: "test" });
    return [
      a.is(".test#my-id[data-test=\"my-test\"]"),
      b.is(".test"),
      c.is("#test"),
    ];
  }).isDeepEqual([true, true, true]);

  test("off()", function () {
    const result = [];
    let toggle = false;
    let a = el({ onClick: onClick });

    function onClick() {
      toggle = !toggle;
    }

    a.trigger("click");
    result.push(toggle);

    a.off("click");
    a.trigger("click");
    result.push(toggle);

    a.on("click", onClick);
    a.trigger("click");
    result.push(toggle);

    a.off("click", onClick);
    a.trigger("click");
    result.push(toggle);

    return result;
  }).isDeepEqual([true, true, false, false]);

  test("on { onClick }", function () {
    var result = [];

    function onClick() {
      toggle = !toggle;
    }

    var toggle = false;
    var a = el("div", { onClick: onClick });

    a.trigger("click");
    result.push(toggle);

    return result;
  }).isDeepEqual([true]);

  test("on('click')", function () {
    const result = [];
    let toggle = false;
    const a = el();

    function onClick() {
      toggle = !toggle;
    }

    a.on("click", onClick);
    a.trigger("click");
    result.push(toggle);

    return result;
  }).isDeepEqual([true]);

  test("onAttr", function () {
    const a = el();

    el.onAttr("test", function (value) {
      this.addClass("test-" + value);
    });

    a.attr({ test: "test" });
    return a.attr("class").split(" ").indexOf("test-test") > -1;
  }).isEqual(true);

  test("onToHtml", function () {
    class T extends Component {
      render() {
        return el({ onToHtml: () => { this.addClass("test"); } });
      }
    }
    return el(T).toHtml();
  }).isEqual("<div class=\"test\"></div>");

  test("opt passed to 'dict'", function () {
    class C extends Component { }
    var c = el(C, { option: 1 });
    return c.props.option === 1;
  }).isEqual(true);

  test("parent()", function () {
    class T extends Component {
      render() {
        return el();
      }
    }
    const a = el("div");
    const b = el("div");
    const c = el(T);
    const d = el();

    a.append([b]);
    c.append([d]);

    return [
      b.parent() === a, d.parent() === c.getNode()
    ];
  }).isDeepEqual([true, true]);

  test("prepend()", function () {
    const a = el("div");
    const b = el("div");
    const c = el("div");

    a.append([b]);
    a.prepend([c]);

    return [
      a.childNodes[0] === c,
      a.childNodes[1] === b
    ];
  }).isDeepEqual([true, true]);

  test("previous()", function () {
    const a = el();
    const b = el();
    const c = el();
    el([b, c]);
    return a.previous() === null && c.previous() === b;
  }).isDeepEqual(true);

  test("defaultProps (extended component)", function () {
    function extendProps(C, defaultProps) {
      return function (props) {
        const extendedProps = Object.assign({}, defaultProps, props);
        return el(C, extendedProps);
      };
    }

    class T extends Component {
      render() {
        return el();
      }
    }

    const ExtendedT = extendProps(T, { test: "test" });
    return el(ExtendedT).props.test;
  }).isDeepEqual("test");

  test("ref", function () {
    var a = el({ ref: "test" });
    return a.ref;
  }).isEqual("test");

  test("remove()", function () {
    const a = el();
    const b = el();
    const r = [];

    r.push(a.childNodes.length);
    a.append([b]);
    r.push(a.childNodes.length);
    b.remove();
    r.push(a.childNodes.length);

    return r;
  }).isDeepEqual([0, 1, 0]);

  test("removeChild()", function () {
    const a = el();
    const b = el();
    const r = [];

    r.push(a.childNodes.length);
    a.append([b]);
    r.push(a.childNodes.length);
    a.removeChild(b);
    r.push(a.childNodes.length);

    return r;
  }).isDeepEqual([0, 1, 0]);

  test("removeClass()", function () {
    const a = el({ className: "remove dont-remove" });
    a.removeClass("remove");
    return a.attributes.className;
  }).isDeepEqual(["dont-remove"]);

  test("replaceWith()", function () {
    const a = el();
    const b = el();
    const c = el();

    const d = el({ class: "d" });
    const e = el("table", { class: "e" });

    a.append([b]);
    b.replaceWith(c);
    d.replaceWith(e);

    return [a.childNodes[0] === c, a.childNodes.length, d.tagName === "table" && d.attributes.className[0] === "e"];
  }).isDeepEqual([true, 1, true]);

  test("span > a", function () {
    const a = el().html("<span>this test <a>Text</a></span>");
    return JSON.parse(JSON.stringify(a.children()[0]));
  }).isDeepEqual({
    tagName: "span",
    attributes: {
      style: {},
      className: [],
      disabled: null,
      name: null
    },
    childNodes: [
      "this test ",
      {
        tagName: "a",
        attributes: {
          style: {},
          className: [],
          disabled: null,
          name: null
        },
        childNodes: [
          "Text"
        ]
      }
    ]
  });

  test("style()", function () {
    const a = el();
    const b = el();

    a.style({
      display: "none",
      marginLeft: 1,
      paddingLeft: 1,
    });

    b.style({
      display: "block",
      marginLeft: 2,
      paddingLeft: 3
    });

    return [
      a.style("display"), a.style("marginLeft"), a.style("paddingLeft"),
      b.style("display"), b.style("marginLeft"), b.style("paddingLeft"),
      b.style()
    ];
  }).isDeepEqual([
    "none", "1px", "1px",
    "block", "2px", "3px",
    { display: "block", marginLeft: "2px", paddingLeft: "3px" }
  ]);

  test("text()", function () {
    const a = el([
      "some starting text",
      el(["some secondary text"])
    ]);

    return a.text();
  }).isEqual("some starting text some secondary text");

  test("title()", function () {
    const a = el(Html);
    a.title("test");
    return a.refs.head.find("title").childNodes[0] === "test";
  }).isEqual(true);

  test("toFile()", function () {
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
  }).isEqual(fs.readFileSync(path.resolve("test/assets/toFile.html"), "utf8"));

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

  load();
});
