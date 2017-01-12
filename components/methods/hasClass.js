module.exports = function hasClass(className) {
  var $className = this.attributes.className;

  function each(className) {
    return $className
      .split(' ')
      .map(a => a.trim())
      .includes(className);
  }

  if (Array.isArray(className)) {
    return className.map(each);
  } else {
    return each(className);
  }
};
