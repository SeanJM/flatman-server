const el = require('../../index').el;

module.exports = {
  name : 'attr()',
  this() {
    var a = el('div');
    a.attr('test', '1');
    return a.attr('test');
  },
  isEqual() {
    return '1';
  }
};