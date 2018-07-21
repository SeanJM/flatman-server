export function setRefs(child) {
  const cr = child.ref;

  if (cr && !this.refs[cr]) {
    this.refs[cr] = child;
  }

  for (var k in child.refs) {
    if (!this.refs[k]) {
      this.refs[k] = child.refs[k];
    }
  }
}
