module.exports = function hasClass(className) {
  var $className = this.attributes.className;

  if (Array.isArray(className)) {
    return className.map(a => $className.includes(a));
  } else {
    return $className.includes(className);
  }
};
