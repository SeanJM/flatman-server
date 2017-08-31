const fs = require('fs');

module.exports = function toFile(filename) {
  const value = this.toHtml();
  fs.writeFileSync(filename, value);
  return value;
};
