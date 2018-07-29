const VDOM = require("../class/virtual-dom");
const { commentToHtml } = require("../tools");
const fs = require("fs");
const attributesToString = require("./attributes-to-string");

const isOpen = {
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "doctype": true
};

const isSelfClosing = {
  "circle": true,
  "line": true,
  "ellipsis": true,
  "path": true,
  "polygon": true,
  "rect": true,
};

const attrList = [
  "id",
  "name",
  "href",
  "rel",
  "className",
  "title",
  "style",
  "tabIndex"
];

function sortAttributes(a, b) {
  const aI = attrList.indexOf(a);
  const bI = attrList.indexOf(b);

  if (aI > -1 && bI > -1) {
    return aI - bI;
  } else if (aI > -1) {
    return -1;
  } else if (bI > -1) {
    return 1;
  }
  return 0;
}

function getAttr(node) {
  const attributes = node.attributes;
  const list = attributes ? Object.keys(attributes).sort(sortAttributes) : [];
  let a = [];

  list.forEach(function (attribute) {
    if (typeof attributes[attribute] !== "undefined" && attributes[attribute] != null) {
      a.push(
        attributesToString(attribute, attributes[attribute])
      );
    }
  });

  a = a.filter(a => a.length);

  if (a.length) {
    return " " + a.join(" ");
  }

  return "";
}

function fragmentToHtml(vnode, depth) {
  return vnode.children
    .map((childVNode) => elementToHtml(childVNode, depth))
    .join("");
}

function doctypeToHtml(vnode) {
  let res = "<!DOCTYPE ";
  const attr = getAttr(vnode);
  res += attr || "HTML";
  res += ">\n";
  return res;
}

function nodeToHtml(node, depth) {
  const tab = new Array(depth + 1).join("  ");
  let s = [];
  let children = node.children;

  if (node.__factory && node.__factory.__emitBeforeComponentToHtml) {
    node.__factory.__emitBeforeComponentToHtml(new VDOM(node));
  }

  s.push(tab);

  if (node.tagName === "xml") {
    s.push("<?", node.tagName, getAttr(node));
  } else {
    s.push("<", node.tagName, getAttr(node));
  }

  if (node.tagName === "comment") {
    s = [commentToHtml(node, depth)];
  } else if (node.tagName === "doctype") {
    s = [doctypeToHtml(node, depth)];
  } else if (node.tagName === "xml") {
    s.push("?>\n");
  } else if (node.tagName === "fragment") {
    s = [fragmentToHtml(node, depth)];
  } else if (isOpen[node.tagName]) {
    s.push(">\n");
  } else if (isSelfClosing[node.tagName] || (children && !children.length)) {
    s.push("/>\n");
  } else {
    s.push(">\n");

    children.forEach((childVNode) => {
      if (childVNode.tagName) {
        s.push(elementToHtml(childVNode, depth + 1));
      } else {
        (typeof childVNode === "number" ? childVNode + "" : childVNode)
          .split("\n")
          .forEach(string => {
            s.push(new Array(depth + 2).join("  "), string, "\n");
          });
      }
    });

    s.push(tab);
    s.push("</" + node.tagName + ">\n");
  }

  if (node.__factory && node.__factory.__emitAfterComponentToHtml) {
    node.__factory.__emitAfterComponentToHtml(s.join(""));
  }

  return s.join("");
}

function textToHtml(node, depth) {
  const tab = new Array(depth + 1).join("  ");
  return node.split("\n").map((string) => tab + string + "\n");
}

function elementToHtml(node, depth) {
  if (node.tagName) {
    return nodeToHtml(node, depth);
  }
  return textToHtml(node, depth);
}

function wrapLifecycle(vnode) {
  const vdom = vnode.expand();
  return elementToHtml(vdom, 0);
}

function render(vnode, filename) {
  let initialRender;
  let finalRender;

  if (vnode.__factory) {
    vnode.__factory.__subscribeComponentDidUpdate(() => {
      finalRender = wrapLifecycle(vnode);
    });
  }

  initialRender = wrapLifecycle(vnode);

  if (filename) {
    fs.writeFileSync(
      /\.html$/.test(filename)
        ? filename
        : filename + ".html",
      (finalRender || initialRender),
      "utf8"
    );
  }

  return finalRender || initialRender;
}

module.exports = render;