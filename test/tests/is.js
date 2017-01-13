var el = require('../../flatman').el;

module.exports = {
  name : 'is()',
  this() {
    var a = el('div', { className : 'test', id : 'my-id', dataTest : 'my-test' });
    return a.is('.test#my-id[data-test="my-test"]');
  },
  isEqual() {
    return true;
  }
};