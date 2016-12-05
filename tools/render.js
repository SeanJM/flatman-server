const predicates = require('../predicates/');
const isComponent = predicates.isComponent;
const isDomNode = predicates.isDomNode;
const _ = require('lodash');

const OPEN = [ 'img', 'meta', 'hr', 'link' ];

const ATTR_LIST = [
  'id',
  'class',
  'name',
  'title',
  'style'
];

function sortAttributes(a, b) {
  const aI = ATTR_LIST.indexOf(a);
  const bI = ATTR_LIST.indexOf(b);

  if (aI > -1 && bI > -1) {
    return aI - bI;
  } else if (aI > -1) {
    return -1;
  } else if (bI > -1) {
    return 1;
  }
  return 0;
}

function renderDispatch(self, tab, depth, e) {
  if (typeof e.trigger === 'function') {
    e.trigger('render');
  }
  if (isDomNode(e)) {
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

function renderStyle(value) {
  var styles = [];
  for (var k in value) {
    styles.push(k + ': ' + value[k]);
  }
  return styles.join(';');
}

function renderAttribute(name, value) {
  if (name === 'style') {
   if (typeof value === 'object' && Object.keys(value).length) {
      return `${name}="${renderStyle(value)}"`;
    }
    return '';
  } else if (name === 'class') {
    if (value.length) {
      return `${name}="${value}"`;
    }
    return '';
  } else if (name === 'tabindex') {
    return `tabIndex="${value}"`;
  } else if (name.substr(0, 4) === 'data') {
    return `${_.kebabCase(name)}="${value}"`;
  }
  if (value.length) {
    return `${name}="${value}"`;
  }
  return '';
}

function renderElement(self, tab, depth, e) {
  const attributes = Object.keys(e.attributes).sort(sortAttributes);

  let s = `<${e.tagName}`;
  let a = [];

  attributes.forEach(function (attribute) {
    if (typeof e.attributes[attribute] !== 'undefined') {
      a.push(
        renderAttribute(attribute, e.attributes[attribute])
      );
    }
  });

  a = a.filter(a => a.length);
  if (a.length) {
    s += ' ' + a.join(' ');
  }

  s += '>';

  if (
    e.childNodes.length === 1 && (
      typeof e.childNodes[0] === 'string' || typeof e.childNodes[0] === 'number'
    )
  ) {
    s += `${renderText(self, depth, e.childNodes[0].toString())}</${e.tagName}>`;
  } else {
    if (e.childNodes.length) {
      s += `\n${render(self, e.childNodes, depth + 1)}`;
    }

    if (OPEN.indexOf(e.tagName) === -1) {
      if (e.childNodes.length) {
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
