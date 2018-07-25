const { el } = require("../tools");
const Component = require("../class/component");

module.exports = class Css extends Component {
  render(props) {
    let file = /css$/.test(props.src)
      ? props.src
      : props.src + ".css";
    return el("link", {
      rel: "stylesheet",
      href: file
    });
  }
};