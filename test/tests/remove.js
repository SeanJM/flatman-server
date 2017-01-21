const el = require('../../index').el;

module.exports = {
  name : 'remove()',
  this() {
    var a = el('div');
    var b = el('div');
    var r = [];

    r.push(a.childNodes.length);
    a.append([b]);
    r.push(a.childNodes.length);
    b.remove();
    r.push(a.childNodes.length);
    return r;
  },
  isDeepEqual() {
    return [0, 1, 0];
  }
};