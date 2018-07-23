import { merge } from "@tools";

export default function (El) {
  return function () {
    return new El(this.tagName, merge({}, this.attributes), this.childNodes.map(c => {
      if (typeof c === "string") {
        return c;
      } else {
        return c.clone();
      }
    }));
  };
}