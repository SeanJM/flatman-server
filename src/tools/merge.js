function merge(a) {
  let i = 0;
  const n = arguments.length;
  if (a == null) {
    a = {};
  }
  while (++i < n) {
    if (arguments[i]) {
      mergeRightToLeft(a, arguments[i]);
    }
  }
  return a;
}

function mergeArray(left, right) {
  let i = -1;
  const n = right.length;
  while (++i < n) {
    if (left.indexOf(right[i]) === -1) {
      if (Array.isArray(right[i])) {
        left.push(mergeRightToLeft([], right[i]));
      } else if (typeof right[i] === "object") {
        left.push(mergeRightToLeft({}, right[i]));
      } else {
        left.push(right[i]);
      }
    }
  }
  return left;
}

function mergeRightToLeftObject(left, right) {
  for (var k in right) {
    if (right.hasOwnProperty(k)) {
      if (Array.isArray(right[k])) {
        left[k] = merge([], left[k], right[k]);
      } else if (typeof right[k] === "object") {
        left[k] = merge({}, left[k], right[k]);
      } else {
        left[k] = right[k];
      }
    }
  }
  return left;
}

function mergeRightToLeft(left, right) {
  if (Array.isArray(left) && Array.isArray(right)) {
    return mergeArray(left, right);
  } else if (typeof left === "object" && typeof right === "object") {
    return mergeRightToLeftObject(left, right);
  }
  return right;
}

module.exports = merge;