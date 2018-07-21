import { mount, unmount } from "@tools";

export default function replaceWith(domNode) {
  var index;
  if (this.parentNode) {
    unmount(this);
    index = this.parentNode.childNodes.indexOf(this);
    this.parentNode.childNodes[index] = domNode;
    mount(domNode);
  } else {
    Object.assign(this, domNode, { parentNode: this.parentNode });
  }
  return domNode;
}
