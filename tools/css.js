const el = require('./el');

function css(file) {
  file = /css$/.test(file)
    ? file
    : file + '.css';
  return el('link', { rel : 'stylesheet', href : file });
}

module.exports = css;
