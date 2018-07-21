import { MOUNTED } from "@constants/mounted";

export function unmount(node) {
  const children = node.childNodes;
  const indexOf = MOUNTED.indexOf(node);

  if (children && indexOf !== -1) {
    MOUNTED.splice(indexOf, 1);

    node.trigger("unmount");

    for (var i = 0, n = children.length; i < n; i++) {
      unmount(children[i]);
    }
  }
}