const getSelectorObject = require("./get-selector-object");

function getSiblings(node) {
  return (node && node.parentNode)
    ? node.parentNode.children
    : [];
}

function previous(node) {
  const siblings = getSiblings(node);
  const indexOf = siblings.indexOf(node);
  return siblings[indexOf - 1];
}

function isClassName(node, matchList) {
  const className = node.attributes.className;
  const classList = className ? className.split(" ") : [];
  const classMatch = [];

  let i = -1;
  const n = classList.length;

  while (++i < n) {
    if (matchList.indexOf(classList[i]) > -1) {
      classMatch.push(classList[i]);
    }
  }

  return classMatch.length === matchList.length;
}

function elementIs(node, selectorAttributes) {
  if (!node || typeof node === "string") {
    return false;
  }

  if (selectorAttributes.tagName) {
    if (selectorAttributes.tagName !== node.tagName) {
      return false;
    }
  }

  for (var k in selectorAttributes.attributes) {
    if (k === "className") {
      if (!isClassName(node, selectorAttributes.attributes[k])) {
        return false;
      }
    } else if (selectorAttributes.attributes[k]) {
      if (typeof selectorAttributes.attributes[k] === "string") {
        if (selectorAttributes.attributes[k] !== node.attributes[k]) {
          return false;
        }
      } else if (!selectorAttributes.attributes[k].test(node.attributes[k])) {
        return false;
      }
    }
  }

  if (selectorAttributes.selector === "+") {
    return false;
  } else if (selectorAttributes.selector === "~") {
    return false;
  }

  return true;
}

function elementPathIs(node, selectors) {
  const n = selectors.length - 1;

  for (var i = n; i >= 0; i--) {
    if (selectors[i].selector === "+") {
      selectors.pop();
      node = previous(node);
    } else if (selectors[i].selector === "~") {
      selectors.pop();
      node = node && getSiblings(node).filter(x => elementIs(x, selectors[i - 1]))[0];
    } else if (selectors[i].selector === ">") {
      selectors.pop();
      node = node && node.parentNode;
    } else if (elementIs(node, selectors[i])) {
      selectors.pop();
    } else if (node && i < n) {
      node = node.parentNode;
      i += 1;
    } else if (i === n) {
      return false;
    }
  }

  return selectors.length === 0;
}

/**
 * @param {object} node - Virtual node
 * @param {string} selector - The selector to query
*/
function is(node, selector) {
  const selectors = selector
    .split(" ")
    .map(a => getSelectorObject(a.trim()));
  if (selectors.length === 1) {
    return elementIs(node, selectors[0]);
  } else {
    return elementPathIs(node, selectors);
  }
}

module.exports = is;
