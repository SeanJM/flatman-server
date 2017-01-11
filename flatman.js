const DomNode = require('./components/DomNode');
const Component = require('flatman-component');

Component.facade(
  Object.getOwnPropertyNames(DomNode.prototype).filter(a => a !== 'render')
);

module.exports = {
  Component : Component,
  css : require('./tools/css'),
  el : require('./tools/el'),
  page : require('./tools/page'),
  parse : require('./tools/parse'),
  parseFile : require('./tools/parseFile'),
  read : require('./tools/read'),
  script : require('./tools/script'),
};
