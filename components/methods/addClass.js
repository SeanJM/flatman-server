const addClass = require('../../tools/addClass');
module.exports = function (className) {
  addClass(this, className);
  return this;
};
