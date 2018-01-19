const el = require("../../index");

module.exports = {
  name : "onToHtml",
  this() {
    const name = "5w2dH6FRSNNH";
    el.create(name, {
      render() {
        return el({ onToHtml: () => { this.addClass("test"); }});
      }
    });
    let a = el(name);
    return a.toHtml();
  },
  isDeepEqual() {
    return "<div class=\"test\"></div>\n";
  }
};