const el = require('../../index').el;
const Component = require('../../index').Component;

module.exports = {
  name : 'opt passed to \'dict\'',
  this() {
    Component.create('c');
    var c = el('c', { option : 1 });
    return c.dict.option === 1;
  },
  isEqual() {
    return true;
  }
};