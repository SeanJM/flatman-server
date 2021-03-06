const VNode = require("../class/virtual-node");
const kebabCase = require("../tools/kebab-case");

function filterCreatedAttributes(attr) {
  const result = {};
  for (var k in attr) {
    if (k === "class" || k === "className") {
      result.className = attr[k];
    } else if (k === "data") {
      for (var g in attr[k]) {
        result[kebabCase("data-" + g)] = attr[k][g];
      }
    } else if (k.indexOf("xlink:") === 0) {
      result[k] = attr[k];
    } else {
      result[kebabCase(k)] = attr[k];
    }
  }
  return result;
}

function isValidChild(element) {
  return (
    element instanceof VNode ||
    typeof element === "string" ||
    typeof element === "number"
  );
}

function createElement() {
  const args = ["div", {}, []];
  const n = arguments.length;
  let i = -1;

  while (++i < n) {
    if ((typeof arguments[i] === "string" && i === 0) || typeof arguments[i] === "function") {
      args[0] = arguments[i];
    } else if (Array.isArray(arguments[i])) {
      arguments[i].forEach((childNode) => {
        if (isValidChild(childNode)) {
          args[2].push(childNode);
        }
      });
    } else if (isValidChild(arguments[i])) {
      args[2].push(arguments[i]);
    } else if (typeof arguments[i] === "object" && arguments[i] != null) {
      args[1] = arguments[i];
    }
  }

  args[1] = filterCreatedAttributes(args[1]);
  return new VNode(args[0], args[1], args[2]);
}

module.exports = createElement;