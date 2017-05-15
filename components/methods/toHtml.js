const isText = require('../../predicates/isText');
const _ = require('lodash');

const OPEN = [
  'img',
  'meta',
  'hr',
  'link'
];

const SELF_CLOSING = [
  'path',
  'rect',
  'polygon'
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

function toHtmlStyle(value) {
  var styles = [];
  for (var k in value) {
    styles.push(_.kebabCase(k) + ': ' + value[k]);
  }
  return styles.join(';');
}

function toHtmlAttribute(name, value) {
  if (typeof value === 'string') {
    value = value.trim();
  }

  if (name === 'style') {
   if (typeof value === 'object' && Object.keys(value).length) {
      return `${name}="${toHtmlStyle(value)}"`;
    }
    return '';
  } else if (name === 'className') {
    if (value.length) {
      value = value.sort().join(' ');
      return `class="${value}"`;
    }
    return '';
  } else if (name === 'tabindex') {
    return `tabIndex="${value}"`;
  } else if (name.substr(0, 4) === 'data') {
    return `${_.kebabCase(name)}="${value}"`;
  } else if (name === 'viewBox') {
    return `viewBox="${value}"`;
  } else if (name.indexOf(':') !== -1) {
    return `${name}="${value}"`;
  }
  if (value && value.length) {
    return `${_.kebabCase(name)}="${value}"`;
  }
  return '';
}

function toHtmlText(self, depth, string) {
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
        toHtmlAttribute(attribute, attributes[attribute])
      );
    }
  });

  a = a.filter(a => a.length);

  if (a.length) {
    return ' ' + a.join(' ');
  }

  return '';
}

module.exports = function toHtml() {
  const depth = this.parents().filter(a => a.isRendering).length;
  const tab = new Array(depth + 1).join('  ');
  const self = this;

  this.trigger('html');

  let s = [ `<${this.tagName}` ];

  this.isRendering = true;

  if (this.isBlockElement() || (this.parentNode && this.parentNode.isBlockElement())) {
    if (depth) {
      s.unshift('\n', tab);
    } else {
      s.unshift(tab);
    }
  }

  s.push(getAttributes(this.attributes));

  if (SELF_CLOSING.indexOf(this.tagName) === -1) {
    s.push('>');
    if (this.childNodes.length === 1 && isText(this.childNodes[0])) {
      s.push(toHtmlText(self, depth, this.childNodes[0].toString()));
      s.push(`</${this.tagName}>`);
    } else {
      if (this.childNodes.length) {
        s.push(`${this.childNodes.filter(a => a.toHtml).map(a => a.toHtml()).join('')}`);
      }

      if (OPEN.indexOf(this.tagName) === -1) {
        if (this.isBlockElement() && this.childNodes.length) {
          s.push(`\n${tab}`);
        }
        s.push(`</${this.tagName}>`);
      }
    }
  } else {
    // Self closing nodes have no children
    s.push('/>');
  }

  this.isRendering = false;

  return s.join('');
};
