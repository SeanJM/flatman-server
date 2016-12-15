module.exports = function parents() {
  let p = [];
  let n = this.parentNode;
  while (n) {
    p.push(n);
    n = n.parentNode;
  }
  return p;
};
