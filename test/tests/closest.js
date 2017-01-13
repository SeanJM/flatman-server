var el = require('../../flatman').el;


module.exports = {
  name : 'closest()',
  this() {
    var a = el('div');
    var b = el('div', { className : 'test' });
    var c = el('div', { className : 'test' });
    var d = el('div', { className : 'test' });

    a.append([ b.append([ c.append([ d ]) ]) ]);

    return d.closest('.test') === c;
  },
  isEqual() {
    return true;
  }
};