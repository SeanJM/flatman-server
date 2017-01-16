const el = require('../../index').el;

var a = el('div', { className : 'parent' });
var b = el('div');
var c = el('div');
var d = el('div');

var result = [];

a.append([b, d]);
b.after(c);

result.push(b.after() === c);

module.exports = {
  name : 'after()',
  this() {
    return result;
  },
  isDeepEqual() {
    return [ true ];
  }
};