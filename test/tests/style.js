var el = require('../../flatman').el;

module.exports = {
  name : 'style()',
  this() {
    var a = el('div');
    var b = el('div');

    a.style('display', 'none');
    a.style('marginLeft', 1);
    a.style('paddingLeft', 1);

    b.style({
      display : 'block',
      marginLeft : 2,
      paddingLeft : 3
    });

    return [
      a.style('display'), a.style('marginLeft'), a.style('paddingLeft'),
      b.style('display'), b.style('marginLeft'), b.style('paddingLeft'),
      b.style()
    ];
  },
  isDeepEqual() {
    return [
      'none', '1px', '1px',
      'block', '2px', '3px',
      { display : 'block', marginLeft : '2px', paddingLeft : '3px' }
    ];
  }
};