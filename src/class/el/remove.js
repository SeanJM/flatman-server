export default function remove() {
  this.parentNode.removeChild(this);
  return this;
}
