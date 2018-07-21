export function get(obj, path) {
  let t = obj;
  let p = [].concat(path).join(".").split(".");

  for (var i = 0, n = p.length; i < n; i++) {
    if (typeof t[p[i]] === "undefined") {
      return t[p[i]];
    }
    t = t[p[i]];
  }

  return t;
}
