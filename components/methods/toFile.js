const fs = require('fs');

module.exports = function toFile(filename) {
  const value = this.toHtml() + '\n';
  fs.writeFileSync(filename, value);
  return value;
};
