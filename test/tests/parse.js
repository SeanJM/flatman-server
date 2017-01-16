const flatman = require('../../index');
const el = flatman.el;
const fs = require('fs');

module.exports = {
  name : 'el(\'HTML\')',
  this() {
    var a = el('root', [
      el('div', { className : 'test' }),
      el('div', { className : 'test-2' }),
      el('div', { className : 'test-3' }),
    ]);
    return a.toHtml();
  },
  isEqual() {
    var value = fs.readFileSync('test/tests/parse.html', 'utf8');
    var parsed = flatman.parse(value);
    return parsed.toHtml();
  }
};