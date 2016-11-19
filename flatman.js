const fs = require('fs');
const path = require('path');
const el = require('./el');
const script = require('./script');
const css = require('./css');
const render = require('./tools/render');
const queue = require('./tools/queue');
const report = require('./tools/report');

class Page {
  constructor(dest) {
    this.dest = /\.html$/.test(dest)
      ? dest
      : dest + '.html';

    this.document = {
      title : [],
      meta : [],
      content : [],
      head : [],
      css : [],
      scripts : [],
      pixels : [],
      favicon : []
    };
  }

  head() {
    for (let i = 0, n = arguments.length; i < n; i++) {
      this.document.head.push(arguments[i]);
    }

    return this;
  }

  body(elements) {
    if (Array.isArray(elements)) {
      elements.forEach(a => this.document.content.push(a));
    } else {
      throw 'Invalid arguments for flatman.page.body, expected argument is an Array, provided argument is type: ' + typeof elements;
    }

    return this;
  }

  css(file) {
    this.document.css.push(css(file));
    return this;
  }

  favicon() {
    var filename = 'no-file-name-provided';
    var size = 16;

    if (typeof arguments[0] === 'string') {
      filename = arguments[0];
    } else if (typeof arguments[0] === 'number') {
      size = arguments[0];
    }

    if (typeof arguments[1] === 'string') {
      filename = arguments[1];
    } else if (typeof arguments[1] === 'number') {
      size = arguments[1];
    }

    this.document.favicon.push(
      el('link', {
        rel : 'icon',
        type : 'image/png',
        href : filename,
        sizes : size + 'x' + size
      })
    );

    return this;
  }

  pixel(file) {
    var filename = /pixel$/.test(file)
      ? file
      : file + '.pixel';

    if (filename.indexOf(path.sep) === -1) {
      report.error(`Invalid filename: "${filename}", you must include the directory path.`);
      this.error = true;
    } else {
      try {
        this.document.pixels.push(
          fs.readFileSync(filename, 'utf8')
        );
      } catch (res) {
        report.error(`Filename: "${filename}" not found.`);
        this.error = true;
      }
    }

    return this;
  }

  meta(opt) {
    this.document.meta.push(
      el('meta', opt)
    );

    return this;
  }

  mobile() {
    this.meta({
      name : 'viewport',
      content : 'width=device-width initial-scale=1, maximum-scale=1, user-scalable=0'
    });

    this.meta({
      name : 'format-detection',
      content : 'telephone=no'
    });

    return this;
  }

  noscript(content) {
    // Is script
    this.document.scripts.push(
      el(`noscript`, [content])
    );

    return this;
  }

  script(file) {
    this.document.scripts.push(script(file));
    return this;
  }

  title(title) {
    this.document.title = [
      el('title', title)
    ];
    return this;
  }

  write() {
    try {
      let fs = require('fs');
      let head = render(this, this.document.head, 2);
      let meta = render(this, this.document.meta, 2);
      let css = render(this, this.document.css, 2);
      let content = render(this, this.document.content, 2);
      let scripts = render(this, this.document.scripts, 2);
      let title = render(this, this.document.title, 2);
      let favicon = render(this, this.document.favicon, 2);
      let value = '' +
      '<!DOCTYPE HTML>\n' +
      '<html>\n' +
      '  <head>\n' +

      (
        title.length
        ? title + '\n'
        : ''
      ) +
      // Meta
      '    <meta http-equiv="X-UX-Compatible" content="IE=edge,chrome=1">\n' +
      '    <meta charset="UTF-8">\n' +
      (
        meta.length
        ? meta + '\n'
        : ''
      ) +
      (
        head.length
        ? head + '\n'
        : ''
      ) +
      (
        css.length
        ? css + '\n'
        : ''
      ) +
      (
        favicon.length
        ? favicon + '\n'
        : ''
      ) +
      '  </head>\n' +

      '  <body>\n' +
      (
        content.length
        ? content + '\n'
        : ''
      ) +
      (
        scripts.length
        ? scripts + '\n'
        : ''
      ) +

      '  </body>\n' +
      '</html>';

      fs.writeFileSync(this.dest, value);

      return this;
    } catch (e) {
      report.error(e);
    }
  }
}

function page(dest) {
  try {
    return queue(new Page(dest));
  } catch (e) {
    report.error(e);
  }
}

module.exports = {
  page : page,
  el : el,
  script : script,
  css : css
};
