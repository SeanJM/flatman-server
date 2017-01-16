const el = require('../../index').el;

module.exports = {
  name : 'hasClass()',
  this() {
    var a = el('div');

    a.addClass('test');

    return a.hasClass('test') && a.attributes.className.includes('test');
  },
  isEqual() {
    return true;
  }
};