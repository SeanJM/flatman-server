import { camelCase } from "@tools";

const TO_PIXEL = [
  "bottom",
  "height",
  "left",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "right",
  "top",
  "width",
];

function setStyle(property, value) {
  if (property.indexOf("-") > -1) {
    throw "Invalid name: " + property + " please use the JavaScript name for the style of \"" + camelCase(property) + "\"";
  }
  if (TO_PIXEL.includes(property) && typeof value === "number") {
    this.attributes.style[property] = value + "px";
  } else {
    this.attributes.style[property] = value;
  }
}

export default function style(property, value) {
  if (typeof property === "string") {
    if (typeof value !== "undefined") {
      setStyle.call(this, property, value);
      return this;
    } else {
      return this.attributes.style[property];
    }
  } else if (typeof property === "object") {
    for (var name in property) {
      setStyle.call(this, name, property[name]);
    }
  } else {
    return this.attributes.style;
  }

  return this;
}
