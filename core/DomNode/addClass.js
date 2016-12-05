module.exports = function addClass(className) {
  var split = this.attributes.className.split(' ').map(a => a.trim());

  if (!split.includes(className)) {
    split.push(className);
  }

  this.attributes.className = split.sort().join(' ');

  return this;
};
