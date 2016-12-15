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
  }

  for (var k in element.attributes) {
    attributes[attributeCase(k)] = element.attributes[k];
  }

  return el(element.tagName, attributes, format(element.children));
}

function format(arr) {
  return arr.map(formatElement).filter(function (a) {
    return (typeof a === 'string' && a.length) || (typeof a.tagName === 'string');
  });
}

module.exports = function parse(string) {
  const parsed = format(himalaya.parse(string));

  if (parsed.length > 1) {
    return el('root', parsed);
  }

  return parsed[0];
};
