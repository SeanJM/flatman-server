const el = require('../../index').el;

module.exports = {
  name : 'on { onClick }',
  this() {
    var result = [];

    function onClick() {
      toggle = !toggle;
    }

    var toggle = false;
    var a = el('div', { onClick : onClick });

    a.trigger('click');
    result.push(toggle);

    return result;
  },
  isDeepEqual() {
    return [ true ];
  }
};