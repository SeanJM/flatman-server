module.exports = function removeChild(node) {
  this.childNodes.splice(this.childNodes.indexOf(node), 1);
  return this;
};
