const el = require("../src/index");
const Component = require("../src/class/component");

module.exports = function (test) {
  test("createElement", function () {
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

  test("createElement - null attributes", function () {
    return el("div", null, []).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      style: {},
      className: [],
      disabled: null,
      name: null
    },
    childNodes: []
  });

  test("createElement - one child", function () {
    return el("div", null, el("div")).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      style: {},
      className: [],
      disabled: null,
      name: null
    },
    childNodes: [{
      tagName: "div",
      attributes: {
        style: {},
        className: [],
        disabled: null,
        name: null
      },
      childNodes: []
    }]
  });

  test("createElement - one child, component", function () {
    class MyComponent extends Component {
      render() {
        return el("div");
      }
    }
    return el("div", null, el(MyComponent)).toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      style: {},
      className: [],
      disabled: null,
      name: null
    },
    childNodes: [{
      tagName: "div",
      attributes: {
        style: {},
        className: [],
        disabled: null,
        name: null
      },
      childNodes: []
    }]
  });
};