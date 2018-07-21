function getChildren(node) {
  let childNodes = [];

  for (let i = 0, n = node.childNodes.length; i < n; i++) {
    if (node.childNodes[i].tagName === "fragment") {
      childNodes = childNodes.concat(getChildren(node.childNodes[i]));
    } else {
      childNodes.push(node.childNodes[i]);
    }
  }

  return childNodes;
}

function queryChildren(a, b) {
  let childNodes = getChildren(this);

  if (typeof a === "number" && typeof b === "number") {
    return childNodes.slice(a, b);
  } else if (typeof a === "number") {
    return childNodes[a];
  }

  return childNodes;
}

export default function children(a, b) {
  if (Array.isArray(a)) {
    this.childNodes = a;
    return this;
  }
  return queryChildren.call(this, a, b);
}
