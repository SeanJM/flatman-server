const el = require('../../index').el;

module.exports = {
  name : 'addClass()',
  this() {
    var a = el('div');
    a.addClass('test');
    return a.hasClass('test');
  },
  isEqual() {
    return true;
  }
};