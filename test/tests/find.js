const el = require('../../index').el;

var a = el('div');
var b = el ('div', { className : 'test' });

a.append([ b ]);

module.exports = {
  name : 'find()',
  this() {
    return a.find('.test')[0] === b;
  },
  isEqual() {
    return true;
  }
};