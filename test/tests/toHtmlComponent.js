const el = require("../../index");
const fs = require("fs");
const path = require("path");

module.exports = {
  name : "toHtml() (Component)",
  this() {
    el.create("splat", {
      render() {
        return el("div", { className: "splat" });
      }
    });

    var a = el("div", [
      el("div", { className : "div-1" }, [
        el("splat", [
          el("span", {
            className: "splat-child"
          })
        ])
      ])
    ]);

    return a.toHtml();
  },
  isEqual() {
    return fs.readFileSync(path.resolve("test/assets/toHtmlComponent.html"), "utf8");
  }
};