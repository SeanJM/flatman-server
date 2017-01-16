const himalaya = require('himalaya');
const el = require('./el');
const _ = require('lodash');

function attributeCase(attr) {
  return attr.split(':').map(_.kebabCase).join(':');
}

function formatElement(element) {
  let attributes = {};

  if (element.type === 'Text') {
    return element.content.trim();
  } else if (element.type === 'Comment') {
    return false;
  }

  for (var k in element.attributes) {
    if (k === 'className') {
      attributes.className = element.attributes[k].join(' ');
    } else {
      attributes[attributeCase(k)] = element.attributes[k];
    }
  }

  if (element.children) {
    return el(element.tagName, attributes, format(element.children));
  }

  return el(element.tagName, attributes);
}

function format(arr) {
  return arr.map(formatElement).filter(function (a) {
    var isTag = a && typeof a.tagName === 'string';
    var hasLength = typeof a === 'string' && a.length;
    return a && (hasLength || isTag);
  });
}

module.exports = function parse(string) {
  const parsed = format(himalaya.parse(string));
  return el('root', parsed);
};
