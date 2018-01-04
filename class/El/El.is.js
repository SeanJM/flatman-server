const getSelectorObject = require("../../tools/getSelectorObject");

function isClassName(selectorClassList) {
  const classList = this.attributes.className;
  return !!selectorClassList.filter(a => classList.indexOf(a) > -1).length;
}

function elementIs(props) {
  if (props.tagName) {
    if (props.tagName !== this.tagName) {
      return false;
    }
  }

  for (var k in props.attributes) {
    if (k === "class") {
      if (!isClassName.call(this, props.attributes[k])) {
        return false;
      }
    } else if (props.attributes[k]) {
      if (typeof props.attributes[k] === "string") {
        if (props.attributes[k] !== this.attributes[k]) {
          return false;
        }
      } else if (!props.attributes[k].test(this.attributes[k])) {
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

function elementPathIs(selectorList) {
  let parents = [ this ];
  let p       = this.parent();

  while (p) {
    parents.unshift(p);
    p = p.parent();
  }

  for (var i = selectorList.length - 1; i > 0; i--) {
    while (parents.length && selectorList[i]) {
      let prev = selectorList[i - 1];
      p        = parents.slice(-1)[0];
      // Adjacent selector
      if (prev && prev.selector === "+") {
        selectorList.splice(
          i - 2,
          3,
          elementIs.call(p.previous(), selectorList[i - 2]) &&
          elementIs.call(p, selectorList[i])
        );
        i -= 3;
      } else if (prev && prev.selector === "~") {
        // General sibling combinator
        selectorList.splice(
          i - 2,
          3,
          p.previousNodes()
            .map(element => elementIs.call(element, selectorList[i - 2]))
            .filter(a => a)
            .length &&
          elementIs.call(p, selectorList[i])
        );
        i -= 3;
      } else if (prev && prev.selector === ">") {
        // Direct descendent
        selectorList.splice(
          i - 2,
          3,
          elementIs.call(p.parent(), selectorList[i - 2]) &&
          elementIs.call(p, selectorList[i])
        );
        i -= 3;
      } else if (elementIs.call(p, selectorList[i])) {
        selectorList[i] = true;
      }
      parents.pop();
    }
  }

  return selectorList.filter(a => a === true).length === selectorList.length;
}

function isStringSelector(selector) {
  const selectorList = selector
    .split(" ")
    .map(a => getSelectorObject(a.trim()));
  if (selectorList.length === 1) {
    return elementIs.call(this, selectorList[0]);
  } else {
    return elementPathIs.call(this, selectorList);
  }
}

module.exports = function is(selector) {
  if (typeof selector === "function") {
    return selector(this);
  }
  return isStringSelector.call(this, selector);
};
