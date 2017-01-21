const el = require('../../index').el;


module.exports = {
  name : 'closest() predicate',
  this() {
    var a = el('div', { className : 'test-a' });
    var b = el('div', { className : 'test-b' });

    a.append([ b ]);

    return b.closest(a => a.hasClass('test-a')) === a;
  },
  isEqual() {
    return true;
  }
};