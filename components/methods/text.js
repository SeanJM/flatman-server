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
  if (typeof value === 'string' || typeof value === 'number') {
    this.childNodes = [value.toString()];
  } else {
    return cleanText(
      this.childNodes
        .filter(a => typeof a === 'string')
        .join('\n')
    );
  }
};
