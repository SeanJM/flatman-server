const isHTMLString = require('./isHTMLString');

module.exports = function isText(x) {
  return typeof x === 'string' || typeof x === 'number';
};
