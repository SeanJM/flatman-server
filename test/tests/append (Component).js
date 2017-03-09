const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'append() Component',
  this() {
    Component.create('BA', {
      append(children) {
        this.node.content.append(children);
      },
      render() {
        return el('div', [
          el('div', { className : 'target', name : 'content' })
        ])
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
      a.children().length === 1 &&
      a.node.content.children().length === 2 &&
      b.children().length === 1 &&
      b.node.content.children().length === 2
    );
  },
  isEqual() {
    return true;
  }
};