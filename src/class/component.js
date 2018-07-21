import El from "./el";
import Bus from "./bus";

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
      res = El.prototype[method].apply(node, a);
    }

    return res === node
      ? this
      : res;
  };
}

function extendElement(C) {
  for (var k in El.prototype) {
    if (!C.prototype[k]) {
      C.prototype[k] = extendPrototype(k);
    }
  }
  return C;
}

class Component {
  constructor(props) {
    this.props = props;
    this.ref = props.ref;
    this.refs = {};
    this.bus = new Bus({
      target: this
    });
  }

  on(name, callback) {
    this.bus.on(name, callback);
    return this;
  }

  once(name, callback) {
    this.bus.once(name, callback);
    return this;
  }

  off(name, callback) {
    this.bus.off(name, callback);
    return this;
  }

  trigger(name, callback) {
    this.bus.trigger(name, callback);
    return this;
  }

  getNode() {
    return this.node.getNode();
  }

  append(children) {
    this.node.append(children);

    for (var k in this.node.refs) {
      if (!this.refs[k]) {
        this.refs[k] = this.node.refs[k];
      }
    }

    if (this.onAppendChildren) {
      this.onAppendChildren(children);
    }

    return this;
  }

  toJSON() {
    return {
      tagName: this.tagName,
      props: this.props,
      refs: this.refs,
      node: this.node.toJSON()
    };
  }
}

export default extendElement(Component);