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
  const tabNested = new Array(depth + 2).join("  ");
  const isSelfClosing = SELF_CLOSING.indexOf(this.tagName) > -1;
  const isOpen = OPEN.indexOf(this.tagName) > -1;

  const s = [tab, "<", this.tagName, getAttr(this)];

  this.trigger("html");

  if (isSelfClosing) {
    s.push("/>");
  } else if (isOpen) {
    s.push(">");
  } else {
    s.push(">");
    if (
      this.childNodes.length === 1 &&
      typeof this.childNodes[0] === "string" ||
      typeof this.childNodes[0] === "number"
    ) {
      s.push(
        this.childNodes[0]
      );
    } else if (this.childNodes.length) {
      s.push(
        "\n",
        this.childNodes
        .map(a => (
          typeof a === "string" ||
          typeof a === "number"
            ? tabNested + a + "\n"
            : a.toHtml(depth + 1)
        )).join(""),
        tab
      );
    }
    s.push("</" + this.tagName + ">");
  }

  return s.join("") + "\n";
};
