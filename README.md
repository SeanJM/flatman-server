# Flatman server (service side rendering)

## Basic usage

### Creating a component
```js
import el, { Component } from "flatman-server";

class MyElement extends Component {
  render(props) {
    return el("div", { className: "my-class" });
  }
}
```

### Rendering a component
```js
el(MyElement).toHtml(); // <div class="my-class"></div>
```

## The Html component
```js
import el, { Html, Component, render } from "flatman-server";

render(el(Html, {
  // Can be a string, array or null
  scripts: ["bundle.js"],
  // Can be a string, array or null
  styles: "bundle.css",
  // Anything in the head property will be appended to the head tag
  head: [],
  // must be an element or an array of elements
  favicon: [],
  supportMobile: true
}, [
  el("div", {
      className: "my-tiny-page"
    })
]))
```

### Result
```html
<html>
  <head>
    <meta http-equiv="X-UX-Compatible" content="IE=edge,chrome=1">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <script src="bundle.js"></script>
    <link rel="stylesheet" type="text/css" href="bundle.js">
  </head>
  <body>
    <div class="my-tiny-page"></div>
  </body>
</html>
```

### Lifecycle

`onMount` and `onUnmount` work with the `Html` component. `beforeAppendChildren` and 'afterAppendChildren` work with any component.

```js
import el, { Html, Component } from "flatman-server";

class MyComponent extends Component {
  componentDidUpdate(state, prevState) {
    // Do stuff
  }

  beforeComponentToHtml(vnode) {
    // vnode represents the 'expanded' node tree which is rendered.
  }

  afterComponentToHtml(html) {
    // html - the rendered html output
  }

  __emitComponentDidUpdate(state, prevState) {
    let i = -1;
    const n = this.__subscribers.onComponentDidUpdate.length;
    while (++i < n) {
      this.__subscribers.onComponentDidUpdate[i](state, prevState);
    }
  }

  render() {
    return el();
  }
}

```