module.exports = class VNode {
  /**
   * @param {string} tagName - The nodes tagName
   * @param {object} attributes - The nodes attributes
   * @param {array} children - An array of children, strings or elements
   * */
  constructor(tagName, attributes, children) {
    this.props = Object.assign({}, attributes, { children });
    this.tagName = tagName;
    this.attributes = {};
    this.children = children;
    this.refs = {};

    if (typeof tagName === "function" && tagName.prototype.__isComponent) {
      this.__factory = new tagName(this.props);
    }

    for (var k in attributes) {
      if (k === "ref") {
        this.ref = attributes[k];
      } else {
        this.attributes[k] = attributes[k];
      }
    }
  }

  expandComponent() {
    const vnode = this.__factory
      ? this.__factory.render(this.props).expand()
      : this.tagName(this.props).expand();

    if (this.__factory) {
      vnode.__factory = this.__factory;
    }

    return vnode;
  }

  expandElement() {
    this.children = this.children.map((vnode) => {
      const vnodeElement = vnode.expand
        ? vnode.expand()
        : vnode;
      return vnodeElement;
    });
    return this;
  }

  expand() {
    return typeof this.tagName === "function"
      ? this.expandComponent()
      : this.expandElement();
  }

  toJSON() {
    return {
      tagName: this.tagName,
      attributes: this.attributes,
      children: this.children.map((child) =>
        child.toJSON ? child.toJSON() : child)
    };
  }
};