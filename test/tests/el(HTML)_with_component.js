const el   = require("../../index");
const fs   = require("fs");
const path = require("path");

module.exports = {
  name : "el(\'HTML\') with component",
  this() {
    el.create("x",  {
      render() {
        return el("div", { class: "component" });
      }
    });

    el.create("y", {
      render() {
        return el("HTML", [
          el("div"),
          el("div", [
            el("div")
          ]),
          el("div")
        ]);
      }
    });

    var a = el("y");

    a.append([ el("x") ]);
    return a.toHtml();
  },
  isEqual() {
    return fs.readFileSync(
      path.resolve("test/assets/el(HTML)_with_component.html"),
      "utf8"
    );
  }
};