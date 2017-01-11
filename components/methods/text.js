function cleanText(string) {
  var tab = string
    .split('\n')
    .map(a => a.match(/^\s+/m)
    ? a.match(/^\s+/m)[0]
    : ''
  )
  .filter(a => a.length > 0)
  .sort((a, b) => a.length - b.length)[0];

  var exp = new RegExp('^' + tab);

  return string.split('\n').map(a => a.replace(exp, '')).join('\n');
}

module.exports = function text(value) {
  var text = [];

  function getText(element) {
    if (typeof element === 'string') {
      text.push(cleanText(element));
    } else {
      element.childNodes.forEach(getText);
    }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    this.childNodes = [ value.toString() ];
    return this;
  }

  getText(this);
  return text.join('\n');
};
