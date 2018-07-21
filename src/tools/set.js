export function set(obj, path, value) {
  let t = obj;
  let p = [].concat(path).join(".").split(".");
  let l = p.slice(-1)[0];

  for (var i = 0, n = p.length - 1; i < n; i++) {
    if (typeof t[p[i]] === "undefined") {
      t[p[i]] = {};
    }
    t = t[p[i]];
  }

  t[l] = value;
  return value;
}
