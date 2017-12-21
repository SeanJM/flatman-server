module.exports = function children(a, b) {
  if (Array.isArray(a)) {
    this.childNodes = a;
    return this;
  } else if (typeof a === 'number' && typeof b === 'number') {
    return this.childNodes.slice(a, b);
  } else if (typeof a === 'number') {
    return this.childNodes[a];
  }

  return this.childNodes;
};
