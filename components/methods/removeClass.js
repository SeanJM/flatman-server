module.exports = function removeClass(className) {
  var $className = this.attributes.className;
  $className.splice($className.indexOf(className), 1);
  return this;
};
