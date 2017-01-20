const el = require('../../index').el;

module.exports = {
  name : 'attr() class array',
  this() {
    var a = el('div');
    var b = el('div', { className : [ 'this' ].concat('array') });
    a.attr('class', [ 'this', 'array' ]);
    return [ a.attr('class'), b.attr('class') ];
  },
  isDeepEqual() {
    return [ 'this array', 'this array' ];
  }
};