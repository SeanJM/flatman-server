function isDomNode(x) {
  return x && typeof x.constructor && x.constructor.name === 'DomNode';
}

module.exports = isDomNode;
