import { el } from "@tools";
import fs from "fs";
import Component from "@class/component";
import { isDomNode } from "@predicates";

function Head(props) {
  const children = [];

  children.push(
    el("meta", { httpEquiv: "X-UX-Compatible", content: "IE=edge,chrome=1" }),
    el("meta", { charset: "UTF-8" })
  );

  if (props.supportMobile) {
    children.push(
      el("meta", {
        name: "viewport",
        content: [
          "width=device-width",
          "initial-scale=1",
          "maximum-scale=1",
          "user-scalable=0"
        ].join(", ")
      })
    );
  }

  if (props.scripts) {
    [].concat(props.scripts).forEach(a => {
      children.push(isDomNode(a)
        ? a
        : el("script", { src: a })
      );
    });
  }

  if (props.styles) {
    [].concat(props.styles).forEach(a => {
      children.push(isDomNode(a)
        ? a
        : el("link", {
          rel: "stylesheet",
          type: "text/css",
          href: a
        })
      );
    });
  }

  if (props.meta) {
    [].concat(props.meta).forEach(a => {
      children.push(a);
    });
  }

  return el("head",
    {
      ref: "head"
    },
    children
  );
}

export class Html extends Component {
  /**
   * @param {object} props
   * @param {array} props.scripts
   * @param {array} props.styles
   * @param {boolean} props.supportMobile
  */
  constructor(props) {
    super(props);
    this.props.favicon = [];
    this.props.link = [];
    this.props.isMobile = props.isMobile;
    this.on("tohtml", props.onToHtml);
  }

  onToHtml() {
    this.trigger("tohtml");
  }

  getRefs(child) {
    if (child.ref && !this.refs[child.ref]) {
      this.refs[child.ref] = child;
    }
  }

  onAppendChildren(children) {
    let i = -1;
    const n = children.length;
    while (++i < n) {
      this.refs.body.append(children[i]);
    }
  }

  toHtml() {
    return (
      "<!DOCTYPE HTML>\n" +
      this.node.toHtml()
    );
  }

  title(value) {
    if (!this.props.title) {
      this.refs.head.append([
        el("title", { ref: "title" }, [value])
      ]);
    } else {
      this.refs.title.html(value);
    }
  }

  toFile(filename) {
    const value = this.toHtml();
    fs.writeFileSync(filename, value);
    return value;
  }

  render(props) {
    return el("html",
      {
        onToHtml: () => this.onToHtml()
      },
      [
        el(Head, props),
        el("body", {
          ref: "body"
        })
      ]
    );
  }
}