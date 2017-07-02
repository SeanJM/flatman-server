const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'find() (component)',
  this() {
    Component.create('E', {
      render(opt) {
        return el('div', { className : opt.className });
      }
    });

    var a = el('div');
    var b = el('div', { className : 'test' });
    var c = el('E', { className : 'test-2' });

    a.append([
      b.append([ c ])
    ]);

    return a.find('.test-2')[0] === c;
  },
  isEqual() {
    return true;
  }
};