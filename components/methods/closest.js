const getDomNode = require('../../tools/getDomNode');
const getSelectorObject = require('../../tools/getSelectorObject');

module.exports = function closest(selector) {
  let p = this.parentNode;

  while (p) {
    if (p.is(selector)) {
      return p;
    }
    p = p.parentNode;
  }

  return false;
};
