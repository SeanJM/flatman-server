const el = require("../src/index");
const { Component } = require("../src/index");

module.exports = function (test) {
  test("find() (with string and undefined)", function () {
    const a = el();
    const b = el({ class: "test" });
    a.append([b, undefined, "string"]);
    return a.find(".test") === b;
  }).isEqual(true);

  test("find() (component)", function () {
    class E extends Component {
      render(props) {
        return el({ className: props.className });
      }
    }

    const a = el("div");
    const b = el("div", { className: "test" });
    const c = el(E, { className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return (
      a.find(".test-2") === c.getNode() &&
      a.find(".test-3") === false
    );
  }).isEqual(true);

  test("find() (nested)", function () {
    const a = el();
    const b = el({ className: "test" });
    const c = el({ className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return a.find(".test .test-2") === c;
  }).isEqual(true);

  test("find() (predicate)", function () {
    class D extends Component {
      render(props) {
        return el({ className: props.className });
      }
    }

    const a = el();
    const b = el({ className: "test" });
    const c = el(D, { className: "test-2" });

    a.append([
      b.append([c])
    ]);

    return a.find(x => x.attributes.className[0] === "test-2") === c.getNode();
  }).isEqual(true);

  test("find()", function () {
    const a = el();
    const b = el({ class: "test" });
    a.append([b]);
    return a.find(".test") === b && !a.find(".nothing");
  }).isEqual(true);

  test("findAll()", function () {
    const a = el();

    const b = [
      el({ class: "test" }),
      el({ class: "test" }),
      el({ class: "test-2" })
    ];

    const c = [
      el({ class: "test" }),
      el({ class: "test" }),
      el({ class: "test-3" })
    ];

    let d;

    a.append(b[0]);
    b[1].append(c[0]);

    b[0].append(b[1]);
    c[0].append(c[1]);

    d = a.findAll(".test");
    return d.length === 4;
  }).isEqual(true);

  test("contains", function () {
    const a = el();
    const b = el();
    a.append(b);
    return a.contains(b);
  }).isEqual(true);

  test("contains (nested)", function () {
    const a = el();
    const b = el();
    const c = el();
    a.append(b);
    b.append(c);
    return a.contains(c);
  }).isEqual(true);
};