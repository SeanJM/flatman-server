const el = require('../../index').el;

module.exports = {
  name : 'is()',
  this() {
    var a = el('div', { className : 'test', id : 'my-id', dataTest : 'my-test' });
    var b = el('div', { className : 'test' });
    var c = el('div', { id : 'test' });
    return [
      a.is('.test#my-id[data-test="my-test"]'),
      b.is('.test'),
      c.is('#test'),
    ];
  },
  isDeepEqual() {
    return [ true, true, true ];
  }
};