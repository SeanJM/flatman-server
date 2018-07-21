export default function addClass(className) {
  var classList = this.attributes.className;
  if (classList.indexOf(className) === -1) {
    classList.push(className);
  }
  return this;
}