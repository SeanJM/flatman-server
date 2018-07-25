module.exports = function isObject(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
};
