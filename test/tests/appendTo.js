var el = require('../../flatman').el;

module.exports = {
  name : 'appendTo()',
  this() {
    var a = el('div');
    var b = el('div');
    b.appendTo(a);
    return [ a.childNodes.length, a.childNodes[0] === b ];
  },
  equal() {
    return [ 1, true ];
  }
};