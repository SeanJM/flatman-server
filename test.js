const el = require('./flatman').el;
const page = require('./flatman').page;

function Component() {
  this.node = {
    document : el('div', { class : 'component' }, 'test')
  };
}

Component.prototype.append = function (array) {
  this.node.document.append(array);
};

page('test.html').body([
  el('div', { class : 'test' }, [
    el(Component, 'text')
  ])
]).write();
