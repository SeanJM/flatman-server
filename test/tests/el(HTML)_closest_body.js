const el = require("../../index");

module.exports = {
  name : "el(\'HTML\') closest body",
  this() {
    let a = false;
    el("HTML", [
      el("div", {
        onMount: () => {
          a = true;
        }
      }),
      el("script", {
        src : "test.js"
      }),
      el("link", {
        rel : "stylesheet",
        href : "style.css"
      })
    ]).toHtml();

    return a;
  },
  isEqual() {
    return true;
  }
};