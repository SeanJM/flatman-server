const path = require('path');
const fs = require('fs');
const parse = require('./parse');

module.exports = function read(src) {
  const filename = path.resolve(src);
  const value = fs.readFileSync(filename, 'utf8');
  return parse(value);
};
