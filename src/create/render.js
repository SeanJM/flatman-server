const VDOM = require("../class/virtual-dom");
const { commentToHtml, kebabCase } = require("../tools");
const fs = require("fs");

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
  "className",
  "name",
  "title",
  "style"
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

function toHtmlStyle(value) {
  var styles = [];
  for (var k in value) {
    if (typeof value[k] === "string" || typeof value[k] === "number") {
      styles.push(kebabCase(k) + ": " + value[k]);
    }
  }
  return styles.join(";");
}

function toHtmlAttribute(name, value) {
  value = (
    typeof value === "number"
      ? value.toString()
      : value
  );

  if (typeof value === "string") {
    value = value.trim();
  }

  if (name === "style") {
    if (typeof value === "object" && Object.keys(value).length) {
      return `${name}="${toHtmlStyle(value)}"`;
    }
    return "";
  } else if (name === "className") {
    if (value.length) {
      value = value.split(" ").map(a => a.trim()).sort().join(" ");
      return `class="${value}"`;
    }
    return "";
  } else if (name === "tabindex") {
    return `tabIndex="${value}"`;
  } else if (name.substr(0, 4) === "data") {
    return `${kebabCase(name)}="${value}"`;
  } else if (name === "viewBox") {
    return `viewBox="${value}"`;
  } else if (name.indexOf(":") !== -1) {
    return `${name}="${value}"`;
  }
  if (value && value.length) {
    return `${kebabCase(name)}="${value}"`;
  }
  return "";
}

function getAttr(node) {
  const attributes = node.attributes;
  const list = attributes ? Object.keys(attributes).sort(sortAttributes) : [];
  let a = [];

  list.forEach(function (attribute) {
    if (typeof attributes[attribute] !== "undefined") {
      a.push(
        toHtmlAttribute(attribute, attributes[attribute])
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
    fs.writeFileSync(filename, (finalRender || initialRender), "utf8");
  }

  return finalRender || initialRender;
}

module.exports = render;