const el = require('../../index').el;


module.exports = {
  name : 'find()',
  this() {
    var a = el('div');
    var b = el ('div', { className : 'test' });

    a.append([ b ]);

    return a.find('.test')[0] === b;
  },
  isEqual() {
    return true;
  }
};