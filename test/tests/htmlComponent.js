const flatman = require('../../index');
const el = flatman.el;
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'el(\'HTML\')',
  this() {
    var a = el('HTML', [
      el('div'),
      el('script', {
        src : 'test.js'
      }),
      el('link', {
        rel : 'stylesheet',
        href : 'style.css'
      })
    ]);

    return a.toHtml();
  },
  isEqual() {
    return fs.readFileSync(
      path.resolve('test/assets/htmlComponent.html'),
      'utf8'
    );
  }
};