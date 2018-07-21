import { el } from "@tools";
import fs from "fs";
import Component from "@class/component";

const IS_HEAD_TAG = {
  link: true,
  meta: true,
  title: true
};

export class Html extends Component {
  constructor(props) {
    super(props);
    this.props.favicon = [];
    this.props.link = [];
    this.props.isMobile = props.isMobile;
    this.on("tohtml", props.onToHtml);
  }

  onToHtml() {
    this.trigger("tohtml");

    if (this.props.isMobile) {
      this.refs.head.append([
        el("meta", {
          name: "viewport",
          content: [
            "width=device-width",
            "initial-scale=1",
            "maximum-scale=1",
            "user-scalable=0"
          ].join(", ")
        })
      ]);
    }
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
      if (IS_HEAD_TAG[children[i].tagName]) {
        this.refs.head.append(children[i]);
      } else {
        this.refs.body.append(children[i]);
      }
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

  render() {
    return el("html",
      {
        onToHtml: () => this.onToHtml()
      },
      [
        el("head",
          {
            ref: "head"
          },
          [
            el("meta", { httpEquiv: "X-UX-Compatible", content: "IE=edge,chrome=1" }),
            el("meta", { charset: "UTF-8" })
          ]
        ),
        el("body", {
          ref: "body"
        })
      ]
    );
  }
}