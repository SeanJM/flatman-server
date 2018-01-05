module.exports = function commentToHtml(element, depth) {
  const tab = new Array(depth + 1).join("  ");
  const s   = [];
  let c     = element.childNodes;

  s[0] = tab;

  if (!element.parentNode || element.parentNode.tagName !== "comment") {
    s[1] = "<!--";
  }

  if (c.length === 1) {
    s.push(
      c.map(x => x.tagName === "comment" ? commentToHtml(x, 0) : x).join("\n")
    );
  } else {
    s.push(
      c.map((x, i) => {
        const tab = i > 0 ? new Array(depth).join("  ") + "    " : "";
        return (
          x.tagName === "comment"
            ? tab + commentToHtml(x, depth + 1)
            : tab + x
        );
      }).join("\n")
    );
  }

  if (!element.parentNode || element.parentNode.tagName !== "comment") {
    s.push("-->\n");
  }

  return s.join("");
};