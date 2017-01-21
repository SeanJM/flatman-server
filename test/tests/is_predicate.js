const el = require('../../index').el;

module.exports = {
  name : 'is() Predicate',
  this() {
    var a = el('div', { className : 'test-a', id : 'my-id', dataTest : 'my-test' });
    var b = el('div', { className : 'test-b' });
    var c = el('div', { id : 'test' });
    return [
      a.is(a => a.hasClass('test-a')),
      b.is(a => a.hasClass('test-b')),
      c.is(a => a.attr('id') === 'test'),
    ];
  },
  isDeepEqual() {
    return [ true, true, true ];
  }
};