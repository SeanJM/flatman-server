import { setRefs, mount } from "@tools";
import El from "@class/el";

export default function append(maybeArrayOfChildNodes) {
  let childNodes = [].concat(maybeArrayOfChildNodes);
  let i = -1;
  const n = childNodes.length;

  while (++i < n) {
    if (childNodes[i]) {
      let node = childNodes[i].getNode
        ? childNodes[i].getNode()
        : childNodes[i];

      if (node instanceof El) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        setRefs.call(this, childNodes[i]);
        node.parentNode = this;
      }

      this.childNodes.push(node);
      mount(node);
    }
  }

  return this;
}