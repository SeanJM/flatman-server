module.exports = function addClass(className) {
  var $className = this.attributes.className;
  var index = $className.indexOf(className);

  if (index === -1) {
    $className.push(className);
  }

  return this;
};
