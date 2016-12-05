module.exports = function appendTo(parent) {
  parent.childNodes.push(this);
  return this;
};
