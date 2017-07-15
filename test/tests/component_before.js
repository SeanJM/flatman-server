const flatman = require('../../index');
const el = flatman.el;
const Component = flatman.Component;


module.exports = {
  name : 'component before',
  this() {
    var str = 'fajkshkj234hkjdfsh';

    Component.create(str, {
      render() {
        return el('div');
      }
    });

    let a = el(str);
    let b = el(str);
    let c = el(str);

    c.append([ b ]);
    a.before(b);

    return c.childNodes[0] === a;
  },
  isEqual() {
    return true;
  }
};