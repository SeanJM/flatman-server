const el = require("../../index");

module.exports = {
  name : "children([ replace children ])",
  this() {
    var results = [];

    var a = [
      el("div"),
      el("div"),
      el("div"),
      el("div")
    ];

    var b = [
      el("div"),
      el("div"),
      el("div"),
      el("div")
    ];

    var c = el("div", a);

    results.push(c.children().length === 4);
    results.push(c.children(0) === a[0]);
    results.push(c.children(1) === a[1]);
    results.push(c.children(2) === a[2]);
    results.push(c.children(3) === a[3]);

    c.children(b);

    results.push(c.children().length === 8);
    results.push(c.children(0) === a[0]);
    results.push(c.children(1) === a[1]);
    results.push(c.children(2) === a[2]);
    results.push(c.children(3) === a[3]);

    results.push(c.children().length === 4);
    results.push(c.children(0) === b[0]);
    results.push(c.children(1) === b[1]);
    results.push(c.children(2) === b[2]);
    results.push(c.children(3) === b[3]);

    return results;
  },
  isDeepEqual() {
    return [
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true
    ];
  }
};