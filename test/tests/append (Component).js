const el = require("../../index");

module.exports = {
  name : "append() Component",
  this() {
    el.create("BA", {
      append(children) {
        this.refs.content.append(children);
      },
      render() {
        return el("div", [
          el("div", {
            class : "target",
            ref   : "content"
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
      a.children().length === 1,
      a.refs.content.children().length === 2,
      b.children().length === 1,
      b.refs.content.children().length === 2
    ];
  },
  isDeepEqual() {
    return [true, true, true, true];
  }
};