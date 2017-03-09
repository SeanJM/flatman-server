const el = require('../tools/el');
const Component = require('flatman-component');
const fs = require('fs');

Component.create('HTML', {
  constructor() {
    this.props = {
      script : [],
      head : [],
      body : [],
      favicon : [],
      css : []
    };
    this.onHtml = this.onHtml.bind(this);
  },
  onHtml() {
    var body = this.node.document.find('body')[0];
    var head = this.node.document.find('head')[0];

    body.append([].concat(
      this.props.body,
      this.props.script
    ));

    head.append([].concat(
      this.props.favicon,
      this.props.css
    ));
  },
  render() {
    return el('html', {
      onHtml : this.onHtml
    }, [
      el('head', [
        el('meta', { httpEquiv : 'X-UX-Compatible', content : 'IE=edge,chrome=1' }),
        el('meta', { charset : 'UTF-8' })
      ]),
      el('body')
    ]);
  },
  append(children) {
    children.forEach((child) => {
      if (child.tagName === 'script') {
        this.props.script.push(child);
      } else {
        this.props.body.push(child);
      }
    });
  },
  toHtml() {
    return (
      '<!DOCTYPE HTML>\n' +
      this.node.document.toHtml()
    );
  },
  toFile(filename) {
    const value = this.toHtml();
    fs.writeFileSync(filename, value);
    return value;
  }
});
