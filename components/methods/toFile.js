module.exports = function toFile(filename) {
  fs.writeFileSync(filename, this.toHtml());
};
