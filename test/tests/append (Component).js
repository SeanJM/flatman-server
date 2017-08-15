const el = require("../../index").el;
const Component = require("../../index").Component;

module.exports = {
  name : "append() Component",
  this() {
    Component.create("BA", {
      append(children) {
        this.refs.content.append(children);
      },
      render() {
        return el("div", [
          el("div", {
            className : "target",
            ref: "content"
          })
        ]);
      }
    });

    let a = el("BA", [
      el("div"),
      el("div")
    ]);

    let b = el("BA");

    b.append([
      el("div"),
      el("div")
    ]);

    return [
      a.childNodes.length === 1,
      a.refs.content.childNodes.length === 2,
      b.childNodes.length === 1,
      b.refs.content.childNodes.length === 2
    ];
  },
  isDeepEqual() {
    return [true, true, true, true];
  }
};