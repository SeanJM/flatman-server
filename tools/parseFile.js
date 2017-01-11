const parse = require('./parse');
const fs = require('fs');
const path = require('path');

module.exports = function parseFile(filename) {
  var resolved = path.resolve(filename);
  var value = fs.readFileSync(resolved, 'utf8');
  return parse(value);
};
