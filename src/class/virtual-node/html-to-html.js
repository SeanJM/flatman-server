const { commentToHtml, kebabCase } = require("../../tools");

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
  return vnode.children.map((childVNode) => {
    if (childVNode.toHtml) {
      return childVNode.toHtml(depth);
    }
    return childVNode.split("\n").map((string, i) => {
      let response = "";
      if (i > 0) {
        response += "\n";
      }
      response += new Array(depth + 1).join("  ");
      response += string + "\n";
      return response;
    });
  })
    .join("");
}

function doctypeToHtml(vnode) {
  const s = [];
  s.push("<!DOCTYPE");
  s.push(" ");
  s.push(getAttr(vnode));
  if (!s[2].length) {
    s[2] = "HTML";
  }
  s.push(">\n");
  return s.join("");
}

module.exports = function elementToHtml(vnode, depth) {
  const tab = new Array(depth + 1).join("  ");
  const s = [];
  let children = vnode.children;

  s.push(tab);

  if (vnode.tagName === "xml") {
    s.push("<?", vnode.tagName, getAttr(vnode));
  } else {
    s.push("<", vnode.tagName, getAttr(vnode));
  }

  if (vnode.tagName === "comment") {
    return commentToHtml(vnode, depth);
  } else if (vnode.tagName === "doctype") {
    return doctypeToHtml(vnode, depth);
  } else if (vnode.tagName === "xml") {
    s.push("?>");
  } else if (vnode.tagName === "fragment") {
    return fragmentToHtml(vnode, depth);
  } else if (isOpen[vnode.tagName]) {
    s.push(">");
  } else if (isSelfClosing[vnode.tagName] || (children && !children.length)) {
    s.push("/>");
  } else {
    s.push(">\n");

    children.forEach((childVNode) => {
      if (childVNode.tagName) {
        s.push(childVNode.toHtml(depth + 1));
      } else {
        childVNode.split("\n").forEach(string => {
          s.push(new Array(depth + 2).join("  "), string, "\n");
        });
      }
    });

    s.push(tab);
    s.push("</" + vnode.tagName + ">");
  }

  s.push("\n");
  return s.join("");
};
