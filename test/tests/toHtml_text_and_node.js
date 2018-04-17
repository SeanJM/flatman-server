const el = require("../../index");

module.exports = {
  name : "toHtml() text and node",
  this() {
    const a = el([
      el("strong", [ "text" ]),
      "text"
    ]);
    const b = el([
      "text",
      el("strong", [ "text" ]),
    ]);

    return [ a.toHtml(), b.toHtml() ];
  },
  isDeepEqual() {
    return [ "<div>\n  <strong>text</strong>text\n</div>", "<div>\n  text<strong>text</strong>\n</div>" ];
  }
};