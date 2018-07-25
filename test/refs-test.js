require("source-map-support").install();

const el = require("../index");
const { Component } = require("../index");

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
};