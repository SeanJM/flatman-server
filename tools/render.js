const predicates = require('../predicates/');
const isComponent = predicates.isComponent;
const isElement = predicates.isElement;

const OPEN = [ 'img', 'meta', 'hr', 'link' ];

function renderDispatch(self, tab, depth, e) {
  if (typeof e.trigger === 'function') {
    e.trigger('render');
  }
  if (isElement(e)) {
    return renderElement(self, tab, depth, e);
  } else if (isComponent(e)) {
    return renderComponent(self, tab, depth, e);
  } else if (typeof e === 'string' || typeof e === 'number') {
    return renderText(self, depth, e);
  } else if (typeof e === 'undefined') {
    throw new Error('invalid element');
  } else if (typeof e.node === 'undefined') {
    throw new Error('Invalid element \'' + e.constructor.name + '\', it does not have a \'node\' property.');
  } else if (typeof e.node !== 'object') {
    throw new Error('Invalid element \'' + e.constructor.name + '\', the \'node\' property must be an object with a \'node.document\' element.');
  } else if (typeof e.node.document === 'undefined') {
    throw new Error('Invalid element \'' + e.constructor.name + '\', it does not have a \'node.document\' element.');
  } else if (typeof e.node.document === 'undefined') {
    throw new Error('Invalid element \'' + e.constructor.name + '\', it does not have a \'node.document\' element.');
  }
}

function renderText(self, depth, string) {
  var EOL = string.match(/\n/g);
  var tab = new Array(depth + 2).join('  ');

  if (EOL && EOL.length > 1) {
    return '\n' + tab + string.split('\n').join(`\n${tab}`).trim() + '\n' + new Array(depth + 1).join('  ');
  }

  return string.trim();
}

function renderElement(self, tab, depth, e) {
  let s = `<${e.tagName}`;
  let a;
  for (var k in e.attributes) {
    a = typeof e.attributes[k] !== 'undefined'
      ? e.attributes[k].toString().trim()
      : '';
    if (a.length) {
      s += ` ${k}="${a}"`;
    }
  }

  s += '>';

  if (
    e.children.length === 1 && (
      typeof e.children[0] === 'string' || typeof e.children[0] === 'number'
    )
  ) {
    s += `${renderText(self, depth, e.children[0].toString())}</${e.tagName}>`;
  } else {
    if (e.children.length) {
      s += `\n${render(self, e.children, depth + 1)}`;
    }

    if (OPEN.indexOf(e.tagName) === -1) {
      if (e.children.length) {
        s += `\n${tab}`;
      }
      s += `</${e.tagName}>`;
    }
  }

  return s;
}

function renderComponent(self, tab, depth, e) {
  var root = e.node
    ? e.node.document
    : undefined;
  return renderDispatch(self, tab, depth, root);
}

function render(self, elements, depth) {
  const tab = new Array(depth + 1).join('  ');
  if (elements.length) {
    return tab + elements
      .map(function (e) {
        return renderDispatch(self, tab, depth, e);
      })
      .join('\n' + tab);
  }
  return '';
}

module.exports = render;
