require("source-map-support").install();

const el = require("../src/index");
const { Component } = require("../src/index");

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

  test("Component refs (slot)", function () {
    class DE extends Component {
      render() {
        return el([
          el({ ref: "a" }),
          el({ ref: "b" }, [
            el({ ref: "c" }),
            el({ ref: "slot" })
          ])
        ]);
      }
    }

    let de = el(DE, el("div", { ref: "d" }));

    return Object.keys(de.refs).concat(Object.keys(de.refs.a.refs));
  }).isDeepEqual(["a", "b", "c", "slot", "d"]);
};