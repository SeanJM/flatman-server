const { getSelectorObject } = require("../../tools");

function isClassName(vnode, matchList) {
  const className = vnode.attributes.className;
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

function elementIs(vnode, selectorAttributes) {
  if (!vnode || typeof vnode === "string") {
    return false;
  }

  if (selectorAttributes.tagName) {
    if (selectorAttributes.tagName !== vnode.tagName) {
      return false;
    }
  }

  for (var k in selectorAttributes.attributes) {
    if (k === "className") {
      if (!isClassName(vnode, selectorAttributes.attributes[k])) {
        return false;
      }
    } else if (selectorAttributes.attributes[k]) {
      if (typeof selectorAttributes.attributes[k] === "string") {
        if (selectorAttributes.attributes[k] !== vnode.attributes[k]) {
          return false;
        }
      } else if (!selectorAttributes.attributes[k].test(vnode.attributes[k])) {
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

function elementPathIs(vnode, selectors) {
  const n = selectors.length - 1;

  for (var i = n; i >= 0; i--) {
    if (selectors[i].selector === "+") {
      selectors.pop();
      vnode = vnode && vnode.previous();
    } else if (selectors[i].selector === "~") {
      selectors.pop();
      vnode = vnode && vnode
        .siblings()
        .filter(x => elementIs(x, selectors[i - 1]))[0];
    } else if (selectors[i].selector === ">") {
      selectors.pop();
      vnode = vnode && vnode.parentNode;
    } else if (elementIs(vnode, selectors[i])) {
      selectors.pop();
    } else if (vnode && i < n) {
      vnode = vnode.parentNode;
      i += 1;
    } else if (i === n) {
      return false;
    }
  }

  return selectors.length === 0;
}

/**
 * @param {object} vnode - Virtual node
 * @param {string} selector - The selector to query
*/
function is(vnode, selector) {
  const selectors = selector
    .split(" ")
    .map(a => getSelectorObject(a.trim()));
  if (selectors.length === 1) {
    return elementIs(vnode, selectors[0]);
  } else {
    return elementPathIs(vnode, selectors);
  }
}

module.exports = is;
