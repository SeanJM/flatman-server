export default function closest(selector) {
  let p = this.parentNode;

  while (p) {
    if (p.is(selector)) {
      return p;
    }
    p = p.parentNode;
  }

  return false;
}
