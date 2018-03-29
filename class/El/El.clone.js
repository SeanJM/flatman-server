const _ = require("lodash");

module.exports = function (El) {
  return function () {
    return new El(this.tagName, _.cloneDeep(this.attributes), this.childNodes.map(c => {
      if (typeof c === "string") {
        return c;
      } else {
        return c.clone();
      }
    }));
  };
};