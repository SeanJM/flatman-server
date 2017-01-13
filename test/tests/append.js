var el = require('../../flatman').el;

module.exports = {
  name : 'append()',
  this() {
    var a = el('div');
    var b = el('div');
    var c = el('div');
    a.append([b, c]);
    return a.childNodes.length;
  },
  isEqual() {
    return 2;
  }
};