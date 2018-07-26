const El = require("./el");
const Bus = require("./bus");

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
  constructor(props = {}) {
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
    const childNodes = [].concat(children);
    let i = -1;
    const n = childNodes.length;
    const slot = this.refs.slot || this.node;

    if (this.beforeAppendChildren) {
      this.beforeAppendChildren(children);
    }

    slot.append(children);
    while (++i < n) {
      for (const k in slot.refs) {
        if (!this.refs[k])
          this.refs[k] = slot.refs[k];
      }
    }

    if (this.afterAppendChildren) {
      this.afterAppendChildren(children);
    }

    return this;
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