module.exports = function previous() {
  let parentNode = this.parent();
  let siblings = parentNode ? parentNode.children() : [];
  let index = siblings.indexOf(this) - 1;

  while (index > -1 && siblings[index].tagName === "comment") {
    index -= 1;
  }

  return siblings[index] || null;
};
