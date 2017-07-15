// Target is appended before 'this'
module.exports = function before(target) {
  const childNodes = target.parentNode.childNodes;
  const index = childNodes.indexOf(target);
  childNodes.splice(index, 0, this);
  return this;
};
