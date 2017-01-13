var el = require('../../flatman').el;

module.exports = {
  name : 'off()',
  this() {
    var toggle = false;
    var a = el('div', { onClick : function () {
      console.log('click');
      toggle = !toggle;
    } });

    a.trigger('click');
    a.off('click');
    a.trigger('click');
    return toggle;
  },
  isEqual() {
    return true;
  }
};