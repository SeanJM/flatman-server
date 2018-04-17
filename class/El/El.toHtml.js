const _             = require("lodash");
const commentToHtml = require("../../tools/commentToHtml");

const isOpen = {
  "hr"    : true,
  "img"   : true,
  "input" : true,
  "link"  : true,
  "meta"  : true
};

const isSelfClosing = {
  "circle"   : true,
  "line"     : true,
  "ellipsis" : true,
  "path"     : true,
  "polygon"  : true,
  "rect"     : true
};

const isInline = {
  span   : true,
  b      : true,
  strong : true,
  i      : true,
  em     : true,
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
      styles.push(_.kebabCase(k) + ": " + value[k]);
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
      value = value.sort().join(" ");
      return `class="${value}"`;
    }
    return "";
  } else if (name === "tabindex") {
    return `tabIndex="${value}"`;
  } else if (name.substr(0, 4) === "data") {
    return `${_.kebabCase(name)}="${value}"`;
  } else if (name === "viewBox") {
    return `viewBox="${value}"`;
  } else if (name.indexOf(":") !== -1) {
    return `${name}="${value}"`;
  }
  if (value && value.length) {
    return `${_.kebabCase(name)}="${value}"`;
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

function isTextNode(node) {
  return typeof node === "number" || typeof node === "string";
}

function fragmentToHtml(element, depth) {
  let childNodes      = element.childNodes;
  const tab           = new Array(depth + 1).join("  ");
  const parentIsBlock = this.parentNode && !isInline[this.parentNode.tagName];
  const hasText       = childNodes.filter(isTextNode).length;
  const length        = childNodes.length;
  return childNodes
    .map(function (node, i) {
      if (node.toHtml) {
        return node.toHtml(hasText ? 0 : depth);
      }
      return (
        (i === 0 ? tab : "") +
        node +
        (parentIsBlock && length === 1 || length - 1 === i ? "\n": "")
      );
    })
    .join("");
}

module.exports = function toHtml($depth) {
  const depth          = $depth || 0;
  const tab            = new Array(depth + 1).join("  ");
  const tabN           = new Array(depth + 2).join("  ");
  const s              = [];
  const parentIsBlock  = this.parentNode && !isInline[this.parentNode.tagName];
  const siblings       = this.siblings();
  const hasTextSibling = siblings && siblings.filter(isTextNode).length > 0;
  const isLast         = siblings ? siblings.indexOf(this) === siblings.length - 1 : true;
  let childNodes       = this.childNodes;

  this.trigger("tohtml");
  if (parentIsBlock) {
    s.push(tab);
  }

  if (this.tagName === "xml") {
    s.push("<?", this.tagName, getAttr(this));
  } else {
    s.push("<", this.tagName, getAttr(this));
  }

  if (this.tagName === "comment") {
    return commentToHtml(this, depth);
  } else if (this.tagName === "fragment") {
    return fragmentToHtml(this, depth);
  } else if (isSelfClosing[this.tagName]) {
    s.push("/>");
  } else if (isOpen[this.tagName]) {
    s.push(">");
  } else if (this.tagName === "xml") {
    s.push("?>");
  } else {
    s.push(">");
    if (
      childNodes.length === 1 &&
      isTextNode(childNodes[0])
    ) {
      childNodes = childNodes[0].toString().split("\n");
      s.push(
        childNodes.length > 1
          ? "\n" + childNodes.map(a => tabN + a + "\n").join("") + tab
          : childNodes[0]
      );
    } else if (childNodes.length) {
      if (!isInline[this.tagName]) {
        s.push("\n");
      }

      childNodes.forEach((node, i) => {
        if (node.toHtml) {
          s.push(node.toHtml(depth + 1));
        } else {
          if (i === 0) {
            s.push(tabN, node);
          } else if (!isInline[this.tagName] && i === childNodes.length - 1) {
            s.push(node, "\n");
          } else {
            s.push(node);
          }
        }
      });

      if (!isInline[this.tagName]) {
        s.push(tab);
      }
    }
    s.push("</" + this.tagName + ">");
  }

  return s.join("") + (parentIsBlock && (!hasTextSibling || isLast) ? "\n" : "");
};
