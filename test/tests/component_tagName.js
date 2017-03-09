const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'component tagName',
  this() {
    Component.create('DF', {
      render() {
        return el('div')
      }
    });

    return el('DF').tagName;
  },
  isEqual() {
    return 'DF';
  }
};