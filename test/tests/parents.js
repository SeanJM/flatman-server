var el = require('../../flatman').el;

module.exports = {
  name : 'parents()',
  this() {
    var a = el('div');
    var b = el('div');
    var c = el('div');

    a.append([ b.append([ c ]) ]);

    return [
      c.parents()[0] === b,
      c.parents()[1] === a,
      b.parents()[0] === a,
      c.parents()[1] === b
    ];
  },
  isDeepEqual() {
    return [ true, true, true, false ];
  }
};