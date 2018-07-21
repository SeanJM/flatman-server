export default function toJSON() {
  return {
    tagName: this.tagName,
    attributes: this.attributes,
    childNodes: this.childNodes
  };
}
