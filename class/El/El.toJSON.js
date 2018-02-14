const ALPHA       = "0987654321ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const alphaLength = ALPHA.length;

module.exports = function toJSON() {
  let key = "";
  let i   = -1;
  let n   = 10;

  while (++i < n) {
    key += ALPHA[Math.floor(Math.random() * alphaLength)];
  }

  return {
    tagName    : this.tagName,
    key        : key,
    attributes : Object.assign({}, this.attributes, {
      className : this.attributes.className.join(" ")
    }),
    childNodes : this.childNodes
  };
};
