const el = require("../../index");

module.exports = {
  name : "el(\'HTML\') onMount",
  this() {
    let a = [ false, false ];

    el.create("t", {
      render() {
        return el("div", {
          class   : "t",
          onMount : () => {
            a[1] = true;
          }
        });
      }
    });

    el("HTML", [
      el("t"),
      el("div", {
        onMount: () => {
          a[0] = true;
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

    return a[0] === a[1];
  },
  isEqual() {
    return true;
  }
};