const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'append() Component',
  this() {
    Component.create('BA', {
      append(children) {
        this.names.content.append(children);
      },
      render() {
        return el('div', [
          el('div', { className : 'target', name : 'content' })
        ]);
      }
    });

    let a = el('BA', [
      el('div'),
      el('div')
    ]);

    let b = el('BA');

    b.append([
      el('div'),
      el('div')
    ]);

    return (
      a.childNodes.length === 0 &&
      a.names.content.childNodes.length === 2 &&
      b.childNodes.length === 0 &&
      b.names.content.childNodes.length === 2
    );
  },
  isEqual() {
    return true;
  }
};