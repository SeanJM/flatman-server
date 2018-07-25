module.exports = function () {
  const args = ["div", {}, []];
  let i = -1;
  const n = arguments.length;

  while (++i < n) {
    if (typeof arguments[i] === "string" || typeof arguments[i] === "function") {
      args[0] = arguments[i];
    } else if (Array.isArray(arguments[i])) {
      args[2] = arguments[i];
    } else if (typeof arguments[i] === "object" && arguments[i] != null) {
      args[1] = arguments[i];
    }
  }

  return args;
};