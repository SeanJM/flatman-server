var el = require('../../flatman').el;

var a = el('div');
var b = el('div', { class : 'test' });
var c = el('div', { class : 'test' });
var d = el('div', { class : 'test' });

a.append([ b.append([ c.append([ d ]) ]) ]);

module.exports = {
  name : 'closest()',
  this() {
    return d.closest('.test') === c;
  },
  isEqual() {
    return true;
  }
};