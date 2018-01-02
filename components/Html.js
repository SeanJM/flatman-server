const el = require("../tools/el");
const fs = require("fs");

const HEAD_TAGS = {
  link : true,
  meta : true
};

el.create("HTML", {
  constructor(props) {
    this.props = {
      script : [],
      head : [],
      body : [],
      favicon : [],
      link : [],
      isMobile : props.isMobile
    };

    this.on("mount", props.onMount);
  },

  onMount() {
    this.trigger("mount");

    if (this.props.isMobile) {
      this.refs.head.append([
        el("meta", {
          name : "viewport",
          content : [
            "width=device-width initial-scale=1",
            "maximum-scale=1",
            "user-scalable=0"
          ].join(", ")
        })
      ]);
    }

    this.refs.body.append([].concat(
      this.props.body,
      this.props.script
    ));

    this.refs.head.append([].concat(
      this.props.favicon,
      this.props.link
    ));
  },

  getRefs(child) {
    if (child.ref && !this.refs[child.ref]) {
      this.refs[child.ref] = child;
    }
  },

  append(children) {
    children.forEach(child => {
      if (HEAD_TAGS[child.tagName]) {
        this.props.link.push(child);
      } else if (child.tagName === "script") {
        this.props.script.push(child);
      } else {
        this.getRefs(child);
        this.props.body.push(child);
      }
    });
  },

  toHtml() {
    return (
      "<!DOCTYPE HTML>\n" +
      this.node.toHtml()
    );
  },

  title(value) {
    if (!this.props.title) {
      this.refs.head.append([ el("title", { ref: "title" }, [ value ]) ]);
    } else {
      this.refs.title.html(value);
    }
  },

  toFile(filename) {
    const value = this.toHtml();
    fs.writeFileSync(filename, value);
    return value;
  },

  render() {
    return el("html", {
      onMount : () => this.onMount()
    }, [
      el("head", {
        ref: "head"
      }, [
        el("meta", { httpEquiv : "X-UX-Compatible", content : "IE=edge,chrome=1" }),
        el("meta", { charset : "UTF-8" })
      ]),
      el("body", {
        ref: "body"
      })
    ]);
  },
});
