module.exports = function createComponent(maybeConstructor, props, children) {
  const isConstructor = !!maybeConstructor.prototype.toHtml;

  const component = isConstructor
    ? new maybeConstructor(props)
    : maybeConstructor(props);

  if (component) {
    if (isConstructor) {
      component.tagName = maybeConstructor;

      if (maybeConstructor.prototype.render) {
        component.node = maybeConstructor.prototype.render.call(component, props);

        if (typeof component.node === "undefined") {
          throw new Error("Component does not return a valid element.");
        }

        component.ref =
          component.ref
            ? component.ref
            : component.node && component.node.ref;
      }
    }

    if (component.node) {
      component.getNode().on("mount", function () {
        component.onMount && component.onMount({
          target: component.getNode()
        });
      });

      component.getNode().on("unmount", function () {
        component.onUnmount && component.onUnmount({
          target: component.getNode()
        });
      });

      for (var k in component.node.refs) {
        if (!component.refs[k])
          component.refs[k] = component.node.refs[k];
      }

      if (component.node.refs.slot) {
        for (const k in component.node.refs.slot.refs) {
          if (component.refs[k])
            component.refs[k] = component.node.refs.slot.refs[k];
        }
      }

      component.append(children);
    }

    return component;
  } else {
    throw new Error("Invalid component, a component cannot return nothing.");
  }
};