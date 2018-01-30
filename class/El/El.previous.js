module.exports = function previous() {
  const siblings = this.parentNode ? this.parentNode.childNodes : [];
  let index      = siblings.indexOf(this) - 1;

  while (index > 0 && siblings[index].tagName === "comment") {
    index -= 1;
  }

  return siblings[index] || null;
};
