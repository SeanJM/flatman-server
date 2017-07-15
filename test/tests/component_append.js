const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;


module.exports = {
  name : 'component append',
  this() {
    const str = 'adfso8903q4kjglkjfsgkl;iu';

    Component.create(str, {
      render() {
        return el('div');
      }
    });

    const a = el(str);
    const b = el(str);
    const c = el(str);

    c.append([ b ]);
    a.before(b);

    return c.childNodes[0] === a;
  },
  isEqual() {
    return true;
  }
};