const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'find() (component)',
  this() {
    Component.create('c', {
      render(opt) {
        return el('div', { className : opt.className });
      }
    });

    var a = el('div');
    var b = el('div', { className : 'test' });
    var c = el('c', { className : 'test-2' });

    a.append([
      b.append([ c ])
    ]);

    return a.find('c')[0] === c;
  },
  isEqual() {
    return true;
  }
};