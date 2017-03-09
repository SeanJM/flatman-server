const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'component text',
  this() {
    Component.create('XY', {
      text(value) {
        if (typeof value === 'undefined') {
          return this.node.document.text();
        } else {
          this.node.document.text('xy' + value);
        }
      },
      render() {
        return el('div')
      }
    });

    let a = el('XY', [ 'lophone' ]);

    return a.text();
  },
  isEqual() {
    return 'xylophone';
  }
};