const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'opt passed to \'dict\'',
  this() {
    Component.lib.C = undefined;
    Component.create('C');
    var c = el('C', { option : 1 });
    return c.props.option === 1;
  },
  isEqual() {
    return true;
  }
};