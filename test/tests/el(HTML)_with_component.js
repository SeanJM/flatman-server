const { el, Component } = require("../../index");
const fs = require("fs");
const path = require("path");

module.exports = {
  name : "el(\'HTML\') with component",
  this() {
    Component.create("x",  {
      render() {
        return el("div", { className: "component" });
      }
    });

    Component.create("y", {
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