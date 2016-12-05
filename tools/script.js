const el = require('./el');

function script(file) {
  // Is script
  if (/\(/.test(file)) {
    return el('script', [file]);
  }
  // Is a file
  file = /js$/.test(file)
    ? file
    : file + '.js';
  return el('script', { src : file });
}

module.exports = script;
