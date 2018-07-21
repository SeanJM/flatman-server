export function isHtmlString(value) {
  return /<[^>]+?>/.test(value);
}
