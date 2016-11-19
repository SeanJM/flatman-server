function isHtmlString(value) {
  return /<[^>]+?>/.test(value);
}

module.exports = isHtmlString;
