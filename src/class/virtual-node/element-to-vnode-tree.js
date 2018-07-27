function componentClassToVNodeTree(vnode, depth) {
  const props = Object.assign({}, {
    children: vnode.children,
  },
    vnode.attributes
  );

  const component = new vnode.tagName(props);
  const vnodeElement = component.render(props);
  vnodeElement.depth = depth;
  return vnodeElement;
}

function pureComponentToHtml(vnode, depth) {
  const props = Object.assign({}, {
    children: vnode.children,
  }, vnode.attributes);
  const vnodeElement = vnode.tagName(props);
  vnodeElement.depth = depth;
  return vnodeElement;
}

function componentToVNodeTree(vnode, depth) {
  if (vnode.tagName.prototype.render) {
    return componentClassToVNodeTree(vnode, depth);
  }
  return pureComponentToHtml(vnode, depth);
}

module.exports = function elementToHtml(vnode, depth = 0) {
  // Is component
  if (typeof vnode.tagName === "function") {
    return componentToVNodeTree(vnode, depth);
  }
  vnode.depth = depth;
  return vnode;
};
