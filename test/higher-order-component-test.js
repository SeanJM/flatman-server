const el = require("../src/index");
const { Component } = require("../src/index");

function withProps(C) {
  return function (props) {
    return el(C, Object.assign({}, props, { test: "test" }));
  };
}

module.exports = function (test) {
  test("HOC - pure function", function () {
    function Higher(props) {
      return el({ className: props.test });
    }
    const T = withProps(Higher);
    return el(T).toHtml();
  })
    .isEqual("<div class=\"test\"/>\n");

  test("HOC - component", function () {
    class Higher extends Component {
      render(props) {
        return el({ className: props.test });
      }
    }
    const T = withProps(Higher);
    return el(T).toHtml();
  })
    .isEqual("<div class=\"test\"/>\n");

  test("HOC - defaultProps", function () {
    function extendProps(C, defaultProps) {
      return function (props) {
        const extendedProps = Object.assign({}, defaultProps, props);
        return el(C, extendedProps);
      };
    }

    class T extends Component {
      render(props) {
        return el("div", { className: props.test });
      }
    }

    const ExtendedT = extendProps(T, { test: "test" });
    return el(ExtendedT).toHtml();
  }).isDeepEqual("<div class=\"test\"/>\n");
};