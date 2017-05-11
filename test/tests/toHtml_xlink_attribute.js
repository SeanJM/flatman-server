const { el, parse } = require('../../index');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve('test/tests/toHtml_svg.html'), 'utf8');

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