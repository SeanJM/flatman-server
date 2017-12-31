const el = require("../../index");

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

module.exports = {
  name : "append() Component",
  this() {
    let a = el("BA", [
      el(),
      el()
    ]);

    let b = el("BA");

    let c = el("BA");
    let d = el();

    b.append([
      el(),
      el()
    ]);

    c.append(d);

    return [
      a.children().length === 1,
      a.refs.content.children().length === 2,
      b.children().length === 1,
      b.refs.content.children().length === 2,
      d.parentNode === c.getNode().childNodes[0]
    ];
  },
  isDeepEqual() {
    return [true, true, true, true, true];
  }
};