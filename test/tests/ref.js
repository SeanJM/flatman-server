const el = require('../../index').el;

module.exports = {
  name : 'ref',
  this() {
    var a = el('div', { ref : 'test' });
    return a.ref;
  },
  isEqual() {
    return 'test';
  }
};