const el = require("../src/index");
const { Component, render } = require("../src/index");

module.exports = function (test) {
  test("setState", function () {
    class X extends Component {
      constructor(props) {
        super(props);
        this.state = {
          name: "Sean"
        };
      }

      beforeComponentToHtml() {
        if (this.state.name === "Sean") {
          this.setState({
            name: "John"
          });
        }
      }

      render() {
        return el({ class: "component" }, el("div", [this.state.name]));
      }
    }
    const str = render(el(X));
    return str;
  }).isEqual([
    "<div class=\"component\">",
    "  <div>",
    "    John",
    "  </div>",
    "</div>",
    ""
  ].join("\n"));
};