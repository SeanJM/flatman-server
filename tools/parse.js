const parseHtml = require('flatman-parse');
const el = require('./el');
const _ = require('lodash');

function format(element) {
  let attributes = {};

  if (typeof element === 'string') {
    return element.trim();
  } else if (element.tagName === 'comment') {
    return false;
  }

  if (element.childNodes.length) {
    return el(element.tagName, element.attributes, format(element.childNodes));
  }

  return el(element.tagName, element.attributes);
}

module.exports = function parse(string) {
  const parsed = parseHtml(string).map(format);
  return el('root', parsed);
};
