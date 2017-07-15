const el = require('../../index').el;

module.exports = {
  name : 'before()',
  this() {
    var a = el('div');
    var b = el('div');
    var c = el('div');

    var result = [];

    a.append([ b ]);
    c.before(b);

    result.push(a.childNodes[0] === c);
    return result;
  },
  isDeepEqual() {
    return [ true ];
  }
};