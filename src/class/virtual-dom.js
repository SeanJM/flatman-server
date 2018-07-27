const is = require("../tools/is");
const VNode = require("./virtual-node");

function indexDocument(vnode, parentNode) {
  return vnode instanceof VNode
    ? {
      vnode: vnode,
      tagName: vnode.tagName,
      attributes: vnode.attributes,
      parentNode,
      children: vnode.children.map(childNode => indexDocument(childNode, vnode)),
    }
    : vnode;
}

module.exports = class VDOM {
  /**
   * @param {VNode} document - The nodes tagName
   * @param {object} attributes - The nodes attributes
   * @param {array} children - An array of children, strings or elements
   * */
  constructor(document) {
    this.document = indexDocument(document);
  }

  find(selector) {
    function findElement(element, predicate) {
      if (predicate(element)) {
        return element;
      } else if (element.children) {
        let res;
        let i = -1;
        const n = element.children;

        while (++i < n) {
          res = findElement(element.children[i], predicate);
          if (res) {
            return res;
          }
        }
      }

      return null;
    }

    if (typeof selector === "function") {
      return findElement(this.document, selector);
    }

    return findElement(this.document, (element) => is(element, selector));
  }

  findAll(selector) {
    const result = [];

    function findElement(element, predicate) {
      if (predicate(element)) {
        result.push(element);
      }

      if (element.children) {
        let i = -1;
        const n = element.children;

        while (++i < n) {
          findElement(element.children[i], predicate);
        }
      }

      return null;
    }

    if (typeof selector === "function") {
      findElement(this.document, selector);
    }

    findElement(this.document, (element) => is(element, selector));

    return result;
  }
};