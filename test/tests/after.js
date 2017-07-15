const el = require('../../index').el;

module.exports = {
  name : 'after()',
  this() {
    var a = el('div', { className : 'parent' });
    var b = el('div');
    var c = el('div');
    var d = el('div');

    a.append([b, d]);
    c.after(b);

    return a.childNodes[1] === c;
  },
  isEqual() {
    return true;
  }
};