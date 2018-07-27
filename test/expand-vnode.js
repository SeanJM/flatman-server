const el = require("../src/index");
const { Component, Html } = require("../src/index");

class MyComponent extends Component {
  render(props) {
    return el("div", { className: "tree" }, props.children);
  }
}

module.exports = function (test) {
  test("Expand VDOMTree simple", function () {
    var a = el(MyComponent, el("span"));
    return a.expand().toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      className: "tree"
    },
    children: [{
      tagName: "span",
      attributes: {},
      children: [],
    }]
  });

  test("Expand VDOMTree nested component", function () {
    var a = el(MyComponent, el("span", [el(MyComponent)]));
    return a.expand().toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      className: "tree"
    },
    children: [{
      tagName: "span",
      attributes: {},
      children: [{
        tagName: "div",
        attributes: {
          className: "tree",
        },
        children: []
      }],
    }]
  });

  test("Expand VDOMTree text", function () {
    var a = el(MyComponent, "text");
    return a.expand().toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {
      className: "tree"
    },
    children: ["text"]
  });

  test("Expand pure component", function () {
    function PureComponent(props) {
      return el("div", props.children);
    }
    var a = el(PureComponent, "text");
    return a.expand().toJSON();
  }).isDeepEqual({
    tagName: "div",
    attributes: {},
    children: ["text"]
  });

  test("Expand 'Html' component", function () {
    var a = el(Html, "Text");
    var json = a.expand().toJSON();
    return json;
  }).isDeepEqual({
    tagName: "fragment",
    attributes: {},
    children: [{
      tagName: "doctype",
      attributes: {},
      children: []
    }, {
      tagName: "html",
      attributes: {},
      children: [{
        tagName: "head",
        attributes: {},
        children: [{
          tagName: "meta",
          attributes: {
            "http-equiv": "X-UX-Compatible",
            content: "IE=edge,chrome=1"
          },
          children: []
        }, {
          tagName: "meta",
          attributes: {
            charset: "UTF-8"
          },
          children: []
        }]
      }, {
        tagName: "body",
        attributes: { className: undefined },
        children: ["Text"]
      }]
    }]
  });
};