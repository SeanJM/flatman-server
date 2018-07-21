import parseHtml from "flatman-parse";

export default function (El) {
  function parseEach(element) {
    if (typeof element === "string") {
      return element;
    }

    if (element.childNodes && element.childNodes.length) {
      return new El(element.tagName, element.attributes, element.childNodes.map(parseEach));
    }

    return new El(element.tagName, element.attributes);
  }

  function parse(string) {
    const parsed = parseHtml(string).map(parseEach);
    return new El("root", parsed);
  }

  return function html(value) {
    if (typeof value === "string") {
      const parsed = parse(value);
      this.childNodes = parsed.childNodes;
      return this;
    } else {
      return this
        .children()
        .map(child => (
          child.toHtml
            ? child.toHtml()
            : child
        ))
        .join("\n");
    }
  };
}