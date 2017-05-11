const { el, parse } = require('../../index');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve('test/tests/toHtml_svg.html'), 'utf8');

module.exports = {
  name : 'toHtml() (SVG)',
  this() {
    return parse(html).childNodes[0].toFile('test/tests/toHtml_svg_(2).html');
  },
  isEqual() {
    return fs.readFileSync(path.resolve('test/tests/toHtml_svg.html'), 'utf8');
  }
};