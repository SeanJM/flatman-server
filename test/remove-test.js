const el = require("../src/index");

module.exports = function (test) {
  test("remove()", function () {
    const a = el();
    const b = el();
    const r = [];

    r.push(a.childNodes.length);
    a.append([b]);
    r.push(a.childNodes.length);
    b.remove();
    r.push(a.childNodes.length);

    return r;
  }).isDeepEqual([0, 1, 0]);

  test("removeChild()", function () {
    const a = el();
    const b = el();
    const r = [];

    r.push(a.childNodes.length);
    a.append([b]);
    r.push(a.childNodes.length);
    a.removeChild(b);
    r.push(a.childNodes.length);

    return r;
  }).isDeepEqual([0, 1, 0]);

  test("removeChild() (nested)", function () {
    const a = el();
    const b = el();
    const c = el();
    const d = el();
    const r = [];

    a.append(b.append(c.append(d)));

    r.push(a.childNodes.length);
    r.push(c.childNodes.length);
    a.removeChild(d);
    r.push(a.childNodes.length);
    r.push(c.childNodes.length);

    return r;
  }).isDeepEqual([1, 1, 1, 0]);
};