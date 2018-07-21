import fs from "fs";

export default function toFile(filename) {
  const value = this.toHtml();
  fs.writeFileSync(filename, value);
  return value;
}
