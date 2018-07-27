function componentClassToHtml(vnode, depth) {
  const props = Object.assign({}, {
    children: vnode.children,
  },
    vnode.attributes
  );

  const component = new vnode.tagName(props);
  const vnodeElement = component.render(props);
  let html;

  vnodeElement.parentNode = vnode.parentNode;

  if (component.beforeToHtml) {
    component.beforeToHtml();
  }

  html = vnodeElement.toHtml(depth);

  if (component.afterToHtml) {
    component.afterToHtml();
  }

  return html;
}

function pureComponentToHtml(vnode, depth) {
  const props = Object.assign({}, {
    children: vnode.children,
  }, vnode.attributes);
  const vnodeElement = vnode.tagName(props);

  vnodeElement.parentNode = vnode.parentNode;
  return vnodeElement.toHtml(depth);
}

module.exports = function componentToHtml(vnode, depth) {
  if (vnode.tagName.prototype.render) {
    return componentClassToHtml(vnode, depth);
  }
  return pureComponentToHtml(vnode, depth);
};
