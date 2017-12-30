const el = require("../../index");

module.exports = {
  name : "onMount",
  this() {
    const name = "5w2dH6FRSNNH";
    el.create(name, {
      render() {
        return el({ onMount: () => { this.addClass("test"); }});
      }
    });
    let a = el(name);
    return a.toHtml();
  },
  isDeepEqual() {
    return "<div class=\"test\"></div>\n";
  }
};