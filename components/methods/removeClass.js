module.exports = function removeClass(className) {
  var split = this.attributes.className.split(' ').map(a => a.trim());

  split.splice(split.indexOf(className), 1);

  this.attributes.className = split.sort().join(' ');

  return this;
};
