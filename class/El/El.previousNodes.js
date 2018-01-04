module.exports = function previousNodes() {
  const previousNodes = [];
  let p = this.previous();
  while (p) {
    previousNodes.push(p);
    p = p.previous();
  }
  return previousNodes;
};
