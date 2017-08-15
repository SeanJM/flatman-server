module.exports = function html(value) {
  const parse = require("../../tools/parse");

  if (typeof value === "string" || typeof value === "number") {
    this.childNodes = parse(value).childNodes;
    return this;
  }

  return this.childNodes.map(a => a.toHtml()).join("\n");
};
