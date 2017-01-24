const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'component names',
  this() {
    Component.create('DE', {
      render() {
        return el('div', [
          el('div', { name : 'x' }),
          el('div', { name : 'y' }, [
            el('div', { name : 'z' })
          ])
        ])
      }
    });

    Component.create('DA', {
      render() {
        return el('DE');
      }
    });

    let de = el('DE');
    let da = el('DA');

    return (
      de.node.x.name() === 'x' &&
      de.node.y.name() === 'y' &&
      de.node.z.name() === 'z' &&
      da.node.document.node.x.name() === 'x' &&
      da.node.document.node.y.name() === 'y' &&
      da.node.document.node.z.name() === 'z'
    );
  },
  isEqual() {
    return true;
  }
};