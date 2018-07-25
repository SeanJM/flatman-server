module.exports = function prepend(childNodes) {
  childNodes = []
    .concat(childNodes)
    .filter(a => a);

  childNodes.forEach(child => {
    child.parentNode = this;
  });

  [].unshift.apply(this.childNodes, childNodes);

  return this;
};
