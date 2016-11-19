const el = require('./flatman').el;
const page = require('./flatman').page;

function Component() {
  this.node = {
    document : el('div', { class : 'component' }, 'test')
  };
}

page('test.html').body([
  el('div', { class : 'test' }, [
    el(Component)
  ])
]).write();
