const el = require('../tools/el');

module.exports = class Html {
  constructor() {
    this.node = {
      document : el('html')
    };

    this.node.document.append([
      this.node.head = el('head'),
      this.node.body = el('body')
    ]);
  }
  
  render() {
    return (
      '<!DOCTYPE HTML>\n' +
      render(this.childNodes)
    );
  }
};
