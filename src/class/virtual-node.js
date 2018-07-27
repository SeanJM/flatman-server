const is = require("./virtual-node/is");
const elementToHtml = require("./virtual-node/element-to-html");
const elementToVNodeTree = require("./virtual-node/element-to-vnode-tree");

module.exports = class VNode {
  /**
   * @param {string} tagName - The nodes tagName
   * @param {object} attributes - The nodes attributes
   * @param {array} children - An array of children, strings or elements
   * */
  constructor(tagName, attributes, children) {
    this.tagName = tagName;
    this.attributes = {};
    this.children = children;
    this.refs = {};

    children.forEach(childNode => {
      if (typeof childNode === "object") {
        childNode.parentNode = this;
      }
    });

    for (var k in attributes) {
      if (k === "ref") {
        this.ref = attributes[k];
      } else {
        this.attributes[k] = attributes[k];
      }
    }
  }

  is(selector) {
    if (selector instanceof VNode) {
      return this === selector;
    } else if (typeof selector === "function") {
      return selector(this);
    }
    return is(this, selector);
  }

  toJSON() {
    return {
      tagName: this.tagName,
      attributes: this.attributes,
      children: this.children.map((child) =>
        child.toJSON ? child.toJSON() : child)
    };
  }

  expandTree(depth = 0) {
    return elementToVNodeTree(this, depth);
  }

  toHtml(depth = 0) {
    // expandVNodeTree
    const tree = this.expandTree();
    // renderVNodeTree
    return elementToHtml(tree, depth);
  }

  previous() {
    const siblings = this.siblings();
    return siblings[siblings.indexOf(this) - 1];
  }

  siblings() {
    return this.parentNode ? this.parentNode.children : [];
  }
};