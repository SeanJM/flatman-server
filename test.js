const el = require('./flatman').el;
const page = require('./flatman').page;

function Component() {
  this.node = {
    document : el('div', { className : 'component' }, ['test'])
  };
}

Component.prototype.append = function (array) {
  this.node.document.append(array);
};

Component.prototype.text = function (text) {
  this.node.document.text(text);
};

function About() {
  this.node = {
    document : el('div', { className : 'about' })
  };
  this.node.document.on('render', function () {
    console.log(this.render());
    this.addClass('tender');
  });
}

About.prototype.append = function (children) {
  this.node.document.append(children);
  return this;
};

page('test.html').body([
  el('div', { id : 'test', dataId : 'sdkajfhadksjfh', className : 'test' }, [
    el(Component, ['text'])
  ]),
  el('div', { style : { display : 'none' } }),
  el(About, [
    el('div', { className : 'test' }),
    el('div', { className : 'test' }, [
      el('div'),
      el('a', [ el('span', ['text']) ])
    ]),
  ])
]).write();
