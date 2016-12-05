module.exports = function name(value) {
  if (typeof value !== 'undefined') {
    this.attributes.name = value;
    return this;
  } else {
    return this.attributes.name;
  }
};
