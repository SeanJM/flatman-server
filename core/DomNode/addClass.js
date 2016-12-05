module.exports = function addClass(className) {
  var split = this.attributes.class.split(' ').map(a => a.trim());

  if (!split.includes(className)) {
    split.push(className);
  }

  this.attributes.class = split.sort().join(' ');

  return this;
};
