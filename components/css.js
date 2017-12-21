const el = require("../tools/el");

el.create("css", {
  render(opt) {
    let file = /css$/.test(opt.src)
      ? opt.src
      : opt.src + ".css";
    return el("link", { rel : "stylesheet", href : file });
  }
});