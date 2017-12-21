const el = require("../../index");

module.exports = {
  name : "component names",
  this() {
    el.create("DE", {
      render() {
        return el("div", [
          el("div", { ref : "x" }),
          el("div", { ref : "y" }, [
            el("div", { ref : "z" })
          ])
        ]);
      }
    });

    el.create("DA", {
      render() {
        return el("DE");
      }
    });

    let de = el("DE");
    let da = el("DA");

    return (
      de.refs.x.ref === "x" &&
      de.refs.y.ref === "y" &&
      de.refs.z.ref === "z" &&
      da.node.refs.x.ref === "x" &&
      da.node.refs.y.ref === "y" &&
      da.node.refs.z.ref === "z"
    );
  },
  isEqual() {
    return true;
  }
};