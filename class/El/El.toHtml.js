const _ = require("lodash");

const OPEN = [
  "input",
  "img",
  "meta",
  "hr",
  "link"
];

const SELF_CLOSING = [
  "path",
  "rect",
  "polygon"
];

const ATTR_LIST = [
  "id",
  "className",
  "name",
  "title",
  "style"
];

function sortAttributes(a, b) {
  const aI = ATTR_LIST.indexOf(a);
  const bI = ATTR_LIST.indexOf(b);

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
    styles.push(_.kebabCase(k) + ": " + value[k]);
  }
  return styles.join(";");
}

function toHtmlAttribute(name, value) {
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

module.exports = function toHtml($depth) {
  const depth = $depth || 0;
  const tab = new Array(depth + 1).join("  ");
  const tabN = new Array(depth + 2).join("  ");
  const isSelfClosing = SELF_CLOSING.indexOf(this.tagName) > -1;
  const isOpen = OPEN.indexOf(this.tagName) > -1;
  const s = [tab, "<", this.tagName, getAttr(this)];

  let c = this.childNodes;

  this.trigger("html");

  if (this.tagName === "comment") {
    return tab + "<!-- " + this.childNodes.join("\n") + " -->\n";
  } else if (isSelfClosing) {
    s.push("/>");
  } else if (isOpen) {
    s.push(">");
  } else {
    s.push(">");
    if (
      c.length === 1 &&
      typeof c[0] === "string" ||
      typeof c[0] === "number"
    ) {
      c = c[0].toString().split("\n");
      s.push(
        c.length > 1
          ? "\n" + c.map(a => tabN + a + "\n").join("") + tab
          : c[0]
      );
    } else if (c.length) {
      s.push(
        "\n",
        c
        .map(a => (
          a.toHtml
            ? a.toHtml(depth + 1)
            : tabN + a + "\n"
        )).join(""),
        tab
      );
    }
    s.push("</" + this.tagName + ">");
  }

  return s.join("") + "\n";
};
