const el = require('../../index').el;

module.exports = {
  name : 'attr() class array',
  this() {
    var a = el('div');
    a.attr('class', [ 'this', 'array' ]);
    return a.attr('class');
  },
  isEqual() {
    return 'this array';
  }
};