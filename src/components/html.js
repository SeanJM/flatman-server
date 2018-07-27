const el = require("../create/create-element");
const Component = require("../class/component");
const VNode = require("../class/virtual-node");

function Body(props) {
  const children = [].concat(props.children);

  if (props.scripts) {
    [].concat(props.scripts)
      .forEach(a => a instanceof VNode
        ? children.push(a)
        : children.push(el("script", { src: a }))
      );
  }

  return el("body", { className: props.className, }, children);
}

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

  if (props.favicon) {
    Array.prototype.push.apply(children, props.favicon);
  }

  if (props.styles) {
    [].concat(props.styles).forEach(a => {
      children.push(a instanceof VNode
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

  if (props.head) {
    Array.prototype.push.apply(children, props.head);
  }

  if (props.title) {
    children.push(
      el("title", [props.title])
    );
  }

  return el("head",
    {
      ref: "head"
    },
    children
  );
}

module.exports = class Html extends Component {
  /**
   * @param {object} props
   * @param {array} props.scripts
   * @param {array} props.styles
   * @param {boolean} props.supportMobile
  */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(props) {
    return el("fragment", [
      el("doctype"),
      el("html",
        [
          el(Head, props),
          el(Body, props, props.children)
        ]
      )]);
  }
};
