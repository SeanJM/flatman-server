const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'component text',
  this() {
    Component.create('XY', {
      text() {
        return this.document.text();
      },
      render() {
        return el('div');
      }
    });

    let a = el('XY', [ 'loophole' ]);

    return a.text();
  },
  isEqual() {
    return 'loophole';
  }
};