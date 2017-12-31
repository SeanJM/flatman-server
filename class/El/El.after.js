module.exports = function after(target) {
  var index = target.parentNode.childNodes.indexOf(target);
  target.parentNode.childNodes.splice(index + 1, 0, this);
  return this;
};