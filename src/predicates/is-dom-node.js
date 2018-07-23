export function isDomNode(x) {
  return !!(x && typeof x.toHtml === "function");
}
