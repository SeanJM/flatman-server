module.exports = function html(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    this.childNodes = [value.toString()];
  } else {
    throw new Error('Invalid type of argument for \'.html\'');
  }
  return this;
};
