const flatman = require('../../index');
const el = flatman.el;
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'el(\'HTML\')',
  this() {
    var a = el('HTML', [
      el('div'),
      el('script', { src : 'test.js' })
    ]);
    return a.toFile('test/tests/htmlComponent.html');
  },
  isEqual() {
    return fs.readFileSync(path.resolve('test/tests/htmlComponent.html'), 'utf8');
  }
};