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
        ]);
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
      de.names.x.name() === 'x' &&
      de.names.y.name() === 'y' &&
      de.names.z.name() === 'z' &&
      da.document.names.x.name() === 'x' &&
      da.document.names.y.name() === 'y' &&
      da.document.names.z.name() === 'z'
    );
  },
  isEqual() {
    return true;
  }
};