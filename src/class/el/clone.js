import cloneDeep from "lodash/cloneDeep";

export default function (El) {
  return function () {
    return new El(this.tagName, cloneDeep(this.attributes), this.childNodes.map(c => {
      if (typeof c === "string") {
        return c;
      } else {
        return c.clone();
      }
    }));
  };
}