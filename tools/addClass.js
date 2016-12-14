const _ = require('lodash');
const getDomNode = require('./getDomNode');

function addClass(a, b) {
  var node = getDomNode(a) || getDomNode(b);
  var string = typeof a === 'string' ? a : b;
  var className = (node.attr('class') || '').split(' ').map(a => a.trim()).filter(a => a.length);
  var index = className.indexOf(string);

  if (index === -1) {
    className.push(string);
    className.sort();
    node.attr('class', className.join(' '));
  }
}

module.exports = _.curry(addClass);
