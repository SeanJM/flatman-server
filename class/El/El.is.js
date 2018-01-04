const getSelectorObject = require("../../tools/getSelectorObject");

function isClassName(selectorClassList) {
  const classList = this.attributes.className;
  return !!selectorClassList.filter(a => classList.indexOf(a) > -1).length;
}

function elementIs(element, props) {
  if (!element || typeof element === "string") {
    return false;
  }

  if (props.tagName) {
    if (props.tagName !== element.tagName) {
      return false;
    }
  }

  for (var k in props.attributes) {
    if (k === "class") {
      if (!isClassName.call(element, props.attributes[k])) {
        return false;
      }
    } else if (props.attributes[k]) {
      if (typeof props.attributes[k] === "string") {
        if (props.attributes[k] !== element.attributes[k]) {
          return false;
        }
      } else if (!props.attributes[k].test(element.attributes[k])) {
        return false;
      }
    }
  }

  if (props.selector === "+") {
    return false;
  } else if (props.selector === "~") {
    return false;
  }

  return true;
}

function elementPathIs(selectors) {
  let parents = [ this ];
  let p       = this.parent();
  let t       = [];

  while (p) {
    parents.unshift(p);
    p = p.parent();
  }

  for (var i = parents.length - 1; i >= 0; i--) {
    if (selectors.length) {
      for (var x = selectors.length - 1; x >= 0; x--) {
        // Adjacent selector
        if (selectors[x - 1] && selectors[x - 1].selector === "+") {
          t[0] = (
            elementIs(parents[i].previous(), selectors[x - 2]) &&
            elementIs(parents[i], selectors[x])
          );
          if (t[0]) {
            selectors.splice(x - 2, 3);
            x = 0;
          } else {
            x -= 3;
          }
        } else if (selectors[x - 1] && selectors[x - 1].selector === "~") {
          // General sibling combinator
          t[0] = (
            parents[i].previousNodes()
              .map(element => element.tagName && elementIs(element, selectors[x - 2]))
              .filter(a => a)
              .length &&
            elementIs(parents[i], selectors[x])
          );
          if (t[0]) {
            selectors.splice(x - 2, 3);
            x = 0;
          } else {
            x -= 3;
          }
        } else if (selectors[x - 1] && selectors[x - 1].selector === ">") {
          // Direct descendent
          t[0] = (
            elementIs(parents[i].parent(), selectors[x - 2]) &&
            elementIs(parents[i], selectors[x])
          );
          if (t[0]) {
            selectors.splice(x - 2, 3);
            x = 0;
          } else {
            x -= 3;
          }
        } else if (elementIs(parents[i], selectors[x])) {
          selectors.pop();
          x = 0;
        }
      }
    }
  }

  return selectors.length === 0;
}

function isStringSelector(selector) {
  const selectors = selector
    .split(" ")
    .map(a => getSelectorObject(a.trim()));
  if (selectors.length === 1) {
    return elementIs(this, selectors[0]);
  } else {
    return elementPathIs.call(this, selectors);
  }
}

module.exports = function is(selector) {
  if (typeof selector === "function") {
    return selector(this);
  }
  return isStringSelector.call(this, selector);
};
