import { el } from "@tools";
import Component from "@class/component";

export class Css extends Component {
  render(props) {
    let file = /css$/.test(props.src)
      ? props.src
      : props.src + ".css";
    return el("link", {
      rel: "stylesheet",
      href: file
    });
  }
}