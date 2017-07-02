const { el } = require('../../index');

module.exports = {
  name : 'toHtml() (xlink:href)',
  this() {
    return el('use', {
      'xlink:href' : '#id'
    }).toHtml();
  },
  isEqual() {
    return '<use xlink:href="#id"></use>';
  }
};