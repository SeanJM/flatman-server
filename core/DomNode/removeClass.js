module.exports = function removeClass(className) {
  var split = this.attributes.class.split(' ').map(a => a.trim());

  split.splice(split.indexOf(className), 1);

  this.attributes.class = split.sort().join(' ');

  return this;
};
