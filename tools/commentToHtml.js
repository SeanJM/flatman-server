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
    s.push("\n");
    s.push(
      c.map(x => {
        const tab = new Array(depth + 2).join("  ");
        return (
          x.tagName === "comment"
            ? tab + commentToHtml(x, depth + 1)
            : tab + x
        ) + "\n";
      }).join("")
    );
  }

  if (!element.parentNode || element.parentNode.tagName !== "comment") {
    s.push("-->\n");
  }

  return s.join("");
};