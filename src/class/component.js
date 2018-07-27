const VNode = require("./virtual-node");

function extendPrototype(method) {
  return function () {
    const n = arguments.length;
    const a = new Array(n);
    const node = this.getNode();
    let i = -1;
    let res;

    while (++i < n) {
      a[i] = arguments[i];
    }

    if (this.node[method]) {
      res = this.node[method].apply(this.node, a);
    } else {
      res = VNode.prototype[method].apply(node, a);
    }

    return res === node
      ? this
      : res;
  };
}

function extendElement(C) {
  for (var k in VNode.prototype) {
    if (!C.prototype[k]) {
      C.prototype[k] = extendPrototype(k);
    }
  }
  return C;
}

class Component {
  constructor(props = {}) {
    this.props = props;
    this.ref = props.ref;
    this.refs = {};
  }

  toJSON() {
    return {
      tagName: this.tagName.name,
      props: this.props,
      node: this.node.toJSON()
    };
  }
}

module.exports = extendElement(Component);