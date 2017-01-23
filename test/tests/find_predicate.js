const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'find() (predicate)',
  this() {
    Component.lib = {};
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

    return a.find(a => a.componentTagName === 'c')[0] === c.node.document;
  },
  isEqual() {
    return true;
  }
};