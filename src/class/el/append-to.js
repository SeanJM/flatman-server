import { mount } from "@tools";

export default function appendTo(parentNode) {
  parentNode.childNodes.push(this);
  this.parentNode = parentNode;
  mount(this);
  return this;
}
