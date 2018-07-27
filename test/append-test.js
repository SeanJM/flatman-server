const el = require("../src/index");
const { Component } = require("../src/index");

module.exports = function (test) {
  class MyComponent extends Component {
    render() {
      return el("div", { className: "a" });
    }
  }

  test("Component: append()", function () {
    const b = el();
    const c = el();
    const a = el(MyComponent, b, c);
    return a.children.length;
  }).isEqual(2);

  test("Node: append text and node", function () {
    const a = el(["text", el()]);
    return (
      a.children[0] === "text" &&
      a.children[1].tagName === "div"
    );
  }).isEqual(true);

  test("Component: append text and node", function () {
    const a = el(MyComponent, ["text", el()]);
    return (
      a.children[0] === "text" &&
      a.children[1].tagName === "div"
    );
  }).isEqual(true);

  test("Component: append as unlimited args", function () {
    const a = el(MyComponent, "text", el(), el());
    return (
      a.children[0] === "text" &&
      a.children[1].tagName === "div" &&
      a.children[2].tagName === "div"
    );
  }).isEqual(true);
};
