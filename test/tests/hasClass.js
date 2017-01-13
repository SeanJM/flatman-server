var el = require('../../flatman').el;

module.exports = {
  name : 'hasClass()',
  this() {
    var a = el('div');

    a.addClass('test');
    return a.hasClass('test') && a.attributes.className === 'test';
  },
  isEqual() {
    return true;
  }
};