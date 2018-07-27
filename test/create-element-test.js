const el = require("../src/index");
const Component = require("../src/class/component");

module.exports = function (test) {
  class MyComponent extends Component {
    render() {
      return el("div");
    }
  }

  test("createElement (VNode)", function () {
    const node = el("div", { class: "a" });
    return node.toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      className: "a",
    },
    children: []
  });

  test("createElement - null attributes", function () {
    return el("div", null, []).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {},
    children: []
  });

  test("createElement - one child", function () {
    return el("div", null, el("div")).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {},
    children: [{
      tagName: "div",
      attributes: {},
      children: []
    }]
  });

  test("createElement - one child, component", function () {
    return el("div", null, el(MyComponent)).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {},
    children: [{
      tagName: MyComponent,
      attributes: {},
      children: []
    }]
  });

  test("createElement - one child, string", function () {
    return el("div", null, "text").toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {},
    children: ["text"]
  });

  test("createElement - data attributes", function () {
    return el("div", {
      data: {
        id: "test"
      }
    }).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      "data-id": "test"
    },
    children: []
  });
};