var el = require('../../flatman').el;

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