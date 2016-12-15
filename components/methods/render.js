const isText = require('../../predicates/isText');

const OPEN = [
  'img',
  'meta',
  'hr',
  'link'
];

const ATTR_LIST = [
  'id',
  'className',
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

function renderStyle(value) {
  var styles = [];
  for (var k in value) {
    styles.push(k + ': ' + value[k]);
  }
  return styles.join(';');
}

function renderAttribute(name, value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  if (name === 'style') {
   if (typeof value === 'object' && Object.keys(value).length) {
      return `${name}="${renderStyle(value)}"`;
    }
    return '';
  } else if (name === 'className') {
    if (value.length) {
      value = value.split(' ').sort().join(' ');
      return `class="${value}"`;
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

function renderText(self, depth, string) {
  var EOL = string.match(/\n/g);
  var tab = new Array(depth + 2).join('  ');

  if (EOL && EOL.length > 1) {
    return '\n' + tab + string.split('\n').join(`\n${tab}`).trim() + '\n' + new Array(depth + 1).join('  ');
  }

  return string.trim();
}

function getAttributes(attributes) {
  const list = Object.keys(attributes).sort(sortAttributes);
  let a = [];

  list.forEach(function (attribute) {
    if (typeof attributes[attribute] !== 'undefined') {
      a.push(
        renderAttribute(attribute, attributes[attribute])
      );
    }
  });

  a = a.filter(a => a.length);

  if (a.length) {
    return ' ' + a.join(' ');
  }

  return '';
}

module.exports = function render() {
  const depth = this.parents().length;
  const tab = new Array(depth + 1).join('  ');
  const self = this;

  let s = [`<${this.tagName}`];

  if (this.isBlockElement() || this.parentNode.isBlockElement()) {
    if (depth) {
      s.unshift('\n', tab);
    } else {
      s.unshift(tab);
    }
  }

  s.push(getAttributes(this.attributes), '>');

  if (this.childNodes.length === 1 && isText(this.childNodes[0])) {
    s.push(renderText(self, depth, this.childNodes[0].toString()));
    s.push(`</${this.tagName}>`);
  } else {
    if (this.childNodes.length) {
      s.push(`${this.childNodes.map(a => a.render()).join('')}`);
    }

    if (OPEN.indexOf(this.tagName) === -1) {
      if (this.isBlockElement() && this.childNodes.length) {
        s.push(`\n${tab}`);
      }
      s.push(`</${this.tagName}>`);
    }
  }

  return s.join('');
};
