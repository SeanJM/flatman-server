module.exports = function remove() {
  this.parentNode.removeChild(this);
  return this;
};
