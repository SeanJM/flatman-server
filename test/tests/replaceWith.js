var el = require('../../flatman').el;

module.exports = {
  name : 'replaceWith()',
  this() {
    var a = el('div');
    var b = el('div');
    var c = el('div');

    a.append([ b ]);
    b.replaceWith(c);

    return [ a.childNodes[0] === c, a.childNodes.length ];
  },
  isDeepEqual() {
    return [ true, 1 ];
  }
};