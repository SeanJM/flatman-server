const el = require("../tools/el");
const Component = require("flatman-component");
const fs = require("fs");

Component.create("HTML", {
  constructor(props) {
    this.props = {
      script : [],
      head : [],
      body : [],
      favicon : [],
      link : [],
      isMobile : props.isMobile
    };
  },

  onHtml() {
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

  append(children) {
    children.forEach((child) => {
      if (child.tagName === "link") {
        this.props.link.push(child);
      } else if (child.tagName === "script") {
        this.props.script.push(child);
      } else {
        this.props.body.push(child);
      }
    });
  },

  toHtml() {
    return (
      "<!DOCTYPE HTML>\n" +
      this.document.toHtml()
    );
  },

  toFile(filename) {
    const value = this.toHtml();
    fs.writeFileSync(filename, value);
    return value;
  },

  render() {
    return el("html", {
      onHtml : () => this.onHtml()
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
