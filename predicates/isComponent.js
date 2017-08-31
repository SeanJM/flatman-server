module.exports = function isComponent(x) {
  return (
    typeof x === "function"
  ) || (
    typeof x === "object"
    && x.node
    && x.document
  );
};
