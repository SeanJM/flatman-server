var el = require('../../flatman').el;

module.exports = {
  name : 'on(\'click\')',
  this() {
    var result = [];

    function onClick() {
      toggle = !toggle;
    }

    var toggle = false;
    var a = el('div');

    a.on('click', onClick);
    a.trigger('click');
    result.push(toggle);

    return result;
  },
  isDeepEqual() {
    return [ true ];
  }
};