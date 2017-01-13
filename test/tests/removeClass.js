var el = require('../../flatman').el;

module.exports = {
  name : 'removeClass()',
  this() {
    var a = el('div', { className : 'remove dont-remove' });
    a.removeClass('remove');
    return a.attributes.className;
  },
  isDeepEqual() {
    return [ 'dont-remove' ];
  }
};