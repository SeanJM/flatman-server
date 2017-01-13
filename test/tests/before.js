var el = require('../../flatman').el;

var a = el('div');
var b = el('div');
var c = el('div');

var result = [];

a.append([ b ]);
b.before(c);

result.push(b.before() === c);

module.exports = {
  name : 'before()',
  this() {
    return result;
  },
  isDeepEqual() {
    return [ true ];
  }
};