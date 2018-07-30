const { kebabCase } = require("../tools");

const toNumber = {
  zIndex: true
};

const attributeToString = {
  className(value) {
    const isArray = Array.isArray(value);
    const isString = typeof value === "string";

    if (isString) {
      value = value.split(" ");
    }

    return ((isString || isArray) && value.length)
      ? `class="${value.filter(a => a).map(a => a.trim()).sort().join(" ")}"`
      : "";
  },

  style(value) {
    let styles = [];

    if (typeof value === "object") {
      for (const k in value) {
        value[k] = typeof value[k] === "number" && !toNumber[k]
          ? value[k] += "px"
          : value[k];
        styles.push(kebabCase(k) + ": " + value[k]);
      }
      return `style="${styles.join("; ")}"`;
    }

    return `style="${value}`;
  },

  tabindex(value) {
    return `tabIndex="${value}"`;
  },

  "view-box": function (value) {
    return `viewBox="${value}"`;
  },

  "xlink-href": function (value) {
    return `xlink:href="${value}"`;
  }
};

function htmlAttributeToString(name, value) {
  const isString =
    typeof value === "string";

  value = (
    typeof value === "number"
      ? value.toString()
      : value
  );

  if (isString) {
    value = value.trim();
  }

  if (attributeToString[name]) {
    return attributeToString[name](value);
  }

  if (name.indexOf(":") !== -1) {
    return `${name}="${value}"`;
  }

  if (value && value.length) {
    return `${kebabCase(name)}="${value}"`;
  }

  return "";
}

module.exports = htmlAttributeToString;