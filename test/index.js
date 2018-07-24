import "source-map-support/register";
import tinyTest from "tiny-test";
import el, { Component, Html } from "../index";
import fs from "fs";
import path from "path";
import toHtmlTest from "./to-html-test";
import isTest from "./is-test";
import containsFindTest from "./contains-find-test";
import mountTest from "./mount-test";
import htmlComponentTest from "./html-component-test";
import higherOrderComponent from "./higher-order-component-test";

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
    d.append(c);
    b.before(c);

    return c.previous() === b;
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

  test("html()", function () {
    const a = el("div");
    a.html("<span></span>");
    return [a.children()[0].tagName, a.html()];
  }).isDeepEqual(["span", "<span></span>\n"]);

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

  test("removeChild() (nested)", function () {
    const a = el();
    const b = el();
    const c = el();
    const d = el();
    const r = [];

    a.append(b.append(c.append(d)));

    r.push(a.childNodes.length);
    r.push(c.childNodes.length);
    a.removeChild(d);
    r.push(a.childNodes.length);
    r.push(c.childNodes.length);

    return r;
  }).isDeepEqual([1, 1, 1, 0]);

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

  toHtmlTest(test);
  isTest(test);
  containsFindTest(test);
  mountTest(test);
  htmlComponentTest(test);
  higherOrderComponent(test);

  load();
});
