const el = require('../tools/el');
const Component = require('flatman-component');

Component.create('css', {
  render(opt) {
    let file = /css$/.test(opt.src)
      ? opt.src
      : opt.src + '.css';
    return el('link', { rel : 'stylesheet', href : file });
  }
});