var el = require('../../flatman').el;

var a = el('div');
var b = el ('div', { className : 'test' });
var c = el ('div', { className : 'test-2' });

a.append([
  b.append([ c ])
]);

module.exports = {
  name : 'find() (nested)',
  this() {
    return a.find('.test .test-2')[0] === c;
  },
  isEqual() {
    return true;
  }
};