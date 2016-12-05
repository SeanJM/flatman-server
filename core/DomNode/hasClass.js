module.exports = function hasClass(className) {
  return this.attributes.class
    .split(' ')
    .map(a => a.trim())
    .includes(className);
};
