module.exports = function previous() {
  const siblings = this.parentNode.childNodes;
  const index    = siblings.indexOf(this);
  return siblings[index - 1];
};
