module.exports = function prepend(childNodes) {
  const self = this;

  if (typeof this.childNodes === 'undefined') {
    this.childNodes = [];
  }

  childNodes.forEach(function (child) {
    child.parentNode = self;
  });

  if (arguments.length === 1 && Array.isArray(childNodes)) {
    [].unshift.apply(this.childNodes, childNodes);
  } else {
    throw new Error('flatman: Invalid arguement for \'.prepend\', only a single array is allowed');
  }

  return this;
};
