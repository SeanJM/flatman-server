module.exports = function renderTo(filename) {
  fs.writeFileSync(filename, this.render());
};
