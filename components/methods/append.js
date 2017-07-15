module.exports = function append(children) {
  children.forEach(child => {
    if (child && child.trigger) {
      if (child.parentNode) {
        child.remove();
      }
      child.parentNode = this;
    }
  });

  if (arguments.length === 1) {
    [].push.apply(
      this.childNodes,
      children
    );
  }

  return this;
};
