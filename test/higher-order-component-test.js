const el = require("../index");
const { Component } = require("../index");

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
    return el(T).attr("class") === "test";
  })
    .isEqual(true);

  test("HOC - component", function () {
    class Higher extends Component {
      render(props) {
        return el({ className: props.test });
      }
    }
    const T = withProps(Higher);
    return el(T).attr("class") === "test";
  })
    .isEqual(true);
};