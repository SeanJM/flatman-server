const el = require('../../index').el;

module.exports = {
  name : 'text()',
  this() {
    var a = el('div', [
      'some starting text',
      el('div', [ 'some secondary text'])
    ]);

    return a.text();
  },
  isEqual() {
    return 'some starting text some secondary text';
  }
};