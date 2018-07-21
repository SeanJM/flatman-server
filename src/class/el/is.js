import { getSelectorObject } from "@tools";

function isClassName(matchList) {
  const classList = [];
  const className = this.attributes.className;

  for (var i = 0, n = className.length; i < n; i++) {
    if (matchList.indexOf(className[i]) > -1) {
      classList.push(className[i]);
    }
  }

  return classList.length === matchList.length;
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
  let target = this;
  const n = selectors.length - 1;

  for (var i = selectors.length - 1; i >= 0; i--) {
    if (selectors[i].selector === "+") {
      selectors.pop();
      target = target && target.previous();
    } else if (selectors[i].selector === "~") {
      selectors.pop();
      target = target && target
        .siblings()
        .filter(x => elementIs(x, selectors[i - 1]))[0];
    } else if (selectors[i].selector === ">") {
      selectors.pop();
      target = target && target.parent();
    } else if (elementIs(target, selectors[i])) {
      selectors.pop();
    } else if (target && i < n) {
      target = target.parent();
      i += 1;
    } else if (i === n) {
      return false;
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

export default function is(selector) {
  if (typeof selector === "function") {
    return selector(this);
  }
  return isStringSelector.call(this, selector);
}
