module.exports = function isHtmlString(value) {
  return /<[^>]+?>/.test(value);
};
