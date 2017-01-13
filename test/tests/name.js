var el = require('../../flatman').el;

module.exports = {
  name : 'name()',
  this() {
    var a = el('div', { name : 'test' });
    return a.name();
  },
  isEqual() {
    return 'test';
  }
};