const el = require('../../index').el;
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'toFile()',
  this() {
    var a = el('div', [
      el('div', { className : 'div-1' }, [
        el('div', { className : 'div-1-1' }, [
          el('span', { className : 'div-1-1-1' }, [
            el('span', { className : 'div-1-1-1-1' })
          ])
        ]),
        el('div', { className : 'div-1-2' })
      ]),
      el('div', { className : 'div-2' }, [
        el('div', { className : 'div-2-1' }),
        el('div', { className : 'div-2-2' })
      ]),
      el('div', { className : 'div-3' }, [
        el('div', { className : 'div-3-1' }),
        el('div', { className : 'div-3-2' })
      ])
    ]);

    return a.toHtml() + '\n';
  },
  isEqual() {
    return fs.readFileSync(path.resolve('test/tests/toFile.html'), 'utf8');
  }
};