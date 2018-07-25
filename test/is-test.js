const el = require("../index");

module.exports = function (test) {
  test("is() (.a + .b div)", function () {
    const a = el("table", {
      style: {
        fontFamily: "Arial"
      },
      class: "t_p"
    });

    const b = el("table", {
      style: {
        fontFamily: "Arial"
      },
      class: "t_p"
    });

    const c = el("td");

    el([
      a,
      b.append(
        el("tr", [c])
      ),
      el()
    ]);

    return (
      c.is(".t_p + .t_p td") &&
      !b.is(".t_p + .t_p td")
    );
  }).isEqual(true);

  test("is() (.a div + div)", function () {
    const a = el();
    const b = el();
    const c = el("table");
    el({ class: "a" }, [a, b.append(c)]);
    return (
      b.is(".a div + div") &&
      !b.is(".a") &&
      !a.is(".a div + div") &&
      !c.is(".a div + div")
    );
  }).isEqual(true);

  test("is() (.a.b)", function () {
    const a = el({ class: "a b" });
    const b = el({ class: "b" });
    return a.is(".a.b") && !b.is(".a.b");
  }).isEqual(true);

  test("is() (.class1.class2)", function () {
    const a = el({ class: "class1 class2" });
    return (
      a.is(".class1.class2") &&
      a.is(".class2.class1") &&
      a.is(".class2") &&
      a.is(".class1")
    );
  }).isEqual(true);

  test("is() (.parent .child-2)", function () {
    const a = el({ class: "parent" });
    const b = el({ class: "child-1" });
    const c = el({ class: "child-2" });
    a.append(b.append(c));
    return c.is(".parent .child-2");
  }).isEqual(() => true);

  test("is() (.parent .deep)", function () {
    const a = el({ class: "deep" });
    const p = el({ class: "parent" });
    p.append(el().append([el(), el().append(el().append(a))]));
    return a.is(".parent .deep");
  }).isEqual(true);

  test("is() (.parent > div)", function () {
    const a = el();
    const b = el("table");
    const c = el({ class: "test" });
    el({ class: "parent" }, [a, b, c]);
    return (
      a.is(".parent > div") &&
      b.is(".parent > table") &&
      c.is(".parent > .test")
    );
  }).isEqual(true);

  test("is() (+)", function () {
    const a = el("html", {
      style: {},
      class: "",
      disabled: null,
      name: null,
      xmlns: "http://www.w3.org/1999/xhtml"
    });
    return a.is("+");
  }).isEqual(false);

  test("is() (div + div + div)", function () {
    const a = el();
    const b = el();
    const c = el();
    const d = el();
    d.append([a, b, c]);
    return c.is("div + div + div");
  }).isEqual(true);

  test("is() (div + div) with comment", function () {
    const a = el();
    const b = el();
    el([a, el("comment", ["a comment"]), b]);
    return b.is("div + div");
  }).isEqual(true);

  test("is() (div + div) with fragment", function () {
    const a = el();
    const b = el();
    const c = el("fragment", [a]);
    const d = el("fragment", [b]);

    el([c, el("comment", ["comment"]), d]);

    return b.is("div + div");
  }).isEqual(true);

  test("is() (div + div)", function () {
    const a = el();
    const b = el();
    el([a, b]);
    return b.is("div + div");
  }).isEqual(true);

  test("is() (div ~ div)", function () {
    const a = el();
    const b = el("table");
    const c = el();
    el([a, b, c]);
    return (
      c.is("div ~ div") &&
      !b.is("table + table") &&
      b.is("div + table")
    );
  }).isEqual(true);

  test("is() (invalid element)",
    el("div").is("table"))
    .isEqual(false);

  test("is() (is string sibling)", function () {
    const a = el();
    const b = el();
    a.append([b, "string"]);
    return [
      b.is("table + div"),
      b.is("table ~ div"),
      b.is("table > div")
    ];
  }).isDeepEqual([false, false, false]);

  test("is() Predicate", function () {
    const a = el({ className: "test-a", id: "my-id", dataTest: "my-test" });
    const b = el({ className: "test-b" });
    const c = el({ id: "test" });
    return [
      a.is(a => a.attributes.className.indexOf("test-a") > -1),
      b.is(a => a.attributes.className.indexOf("test-b") > -1),
      c.is(a => a.attr("id") === "test"),
    ];
  }).isDeepEqual([true, true, true]);

  test("is()", function () {
    var a = el({ className: "test", id: "my-id", dataTest: "my-test" });
    var b = el({ className: "test" });
    var c = el({ id: "test" });
    return [
      a.is(".test#my-id[data-test=\"my-test\"]"),
      b.is(".test"),
      c.is("#test"),
    ];
  }).isDeepEqual([true, true, true]);
};