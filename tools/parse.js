const himalaya = require('himalaya');
const el = require('./el');

function formatElement(element) {
  if (element.type === 'Text') {
    return element.content.trim();
  }
  return el(element.tagName, element.attributes, format(element.children));
}

function format(arr) {
  return arr.map(formatElement).filter(function (a) {
    return (typeof a === 'string' && a.length) || (typeof a.tagName === 'string');
  });
}

module.exports = function parse(string) {
  var doc = el('document');

  doc.append(
    format(himalaya.parse(string))
  );

  return doc;
};
