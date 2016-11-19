function isElement(x) {
  return x &&
    typeof x.tagName === 'string' &&
    typeof x.attributes === 'object' &&
    Array.isArray(x.children);
}

module.exports = isElement;
