const el   = require("../../index");
const fs   = require("fs");
const path = require("path");

module.exports = {
  name : "el(\'HTML\') refs",
  this() {
    let html = el("HTML", [
      el("div", { ref: "div" }),
      el("div", [ el("div") ]),
      el("div")
    ]);
    html.refs.div.addClass("test");
    return html.toHtml();
  },
  isEqual() {
    return fs.readFileSync(
      path.resolve("test/assets/el(HTML)_refs.html"),
      "utf8"
    );
  }
};