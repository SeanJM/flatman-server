const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'component names',
  this() {
    Component.create('DE', {
      render() {
        return el('div', [
          el('div', { ref : 'x' }),
          el('div', { ref : 'y' }, [
            el('div', { ref : 'z' })
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
      de.refs.x.ref === 'x' &&
      de.refs.y.ref === 'y' &&
      de.refs.z.ref === 'z' &&
      da.document.refs.x.ref === 'x' &&
      da.document.refs.y.ref === 'y' &&
      da.document.refs.z.ref === 'z'
    );
  },
  isEqual() {
    return true;
  }
};