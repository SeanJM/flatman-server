module.exports = function previous() {
  const siblings = this.parentNode ? this.parentNode.childNodes : [];
  const index    = siblings.indexOf(this);
  return index > -1 ? siblings[index - 1] : null;
};
