function isDomNode(x) {
  return x &&
    typeof x.tagName === 'string' &&
    typeof x.attributes === 'object' &&
    Array.isArray(x.childNodes);
}

module.exports = isDomNode;
