module.exports = function hasClass(className) {
  return this.attributes.className
    .split(' ')
    .map(a => a.trim())
    .includes(className);
};
