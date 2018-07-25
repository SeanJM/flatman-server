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
import el, { Html, Component } from "flatman-server";

el(Html, {
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
]).toHtml()
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

### Refs and listening for children being appended

When a component receives children, it will trigger the `onAppendChildren`.

```js
import el, { Html, Component } from "flatman-server";

class MyComponent extends Component {
  onAppendChildren(children) {
    let i = -1;
    const n = children.length;
    while (++i < n) {
      children[i].addClass("a-class-name");
    }
  }

  render() {
    return el(Html, {
      scripts: ["bundle.js"],
      styles: "bundle.css",
      supportMobile: true
    }, [
      el("div", {
      ref: "tinyPage"
        className: "my-tiny-page"
      })
    ]);
  }
}

```

### Refs and rerouting children (slot)

When a component receives children, it can append to the `slot` ref if it exists. Otherwise, the default behaviour will simply append the children to the root element.

```js
import el, { Html, Component } from "flatman-server";

class MyComponent extends Component {
  onAppendChildren(children) {
    this.refs.tinyPage.append(children);
  }

  render() {
    return el(Html, {
      scripts: ["bundle.js"],
      styles: "bundle.css",
      supportMobile: true
    }, [
      el("div", {
        // Will be appended here
      ref: "slot"
        className: "my-tiny-page"
      })
    ]);
  }
}

```

### Component mounted & unmounted

When the root node mounts to the document, it will trigger the `onMount` method of the component. When the root node is removed, it will trigger the `onUnmount` method.

```js
import el, { Html, Component } from "flatman-server";

class MyComponent extends Component {
  onMount(e) {
    // e.target = root node
  }

  onUnmount(e) {
    // e.target = root node
  }

  render() {
    return el();
  }
}

```

### Methods

#### `addClass`

Will append a string to the node `className` attribute.

```js
const a = el("div");
a.addClass("my-class-name");
```

#### `after`

Will append a node after the target node.

```js
const a = el("div");
a.after(targetNode);
```

#### `appendTo`

Will append to a parent node.

```js
const a = el("div");
a.appendTo(parentNode);
```

#### `append`

Will append children inside of the node. Arguments can be an array of children or a single child.

```js
const a = el("div");
a.append([el("div"), el("div")]);
a.append(el("div"));
```

#### `attr`

Will set attribute values for a node. When only a single attribute name is supplied, the return value will be the value of the attribute.

```js
const a = el("div");
a.attr("style", "display: block");
a.attr({ style: "display: block" });
a.attr("style"); // display: block
```

#### `before`

Will append the node to the target node's parent, using the target node as a reference, the node will be inserted **before** the target.

```js
const parent = el("div");
const target = el("div");
const sibling = el("div");
parent.append(target);
sibling.before(target);
```

#### `children`

`children(startIndex, length)` - Returns a list of a children
`children(index)` - Returns the child at the selected index
`children()` - Returns a list of children
`children([node])` - Replaces the node's children with what is contained inside the array

#### `clone`

Will create a deep copy a node.

```js
const a = el("div");
const b = a.clone();
```

#### `closest`

Will return the closest parent which matches a selector pattern. If you want to see if an element matches a selected, you can use `is`.

```js
const a = el("div", {
  className: "test"
});
const b = el("div");
const c = el("div");
a.append([b, c]);
c.closest(".test") // a
```

#### `contains`

Will return a boolean if the parent node contains a the child node (uses `find`).

```js
const a = el("div", {
  className: "test"
});
const b = el("div");
const c = el("div");
a.contains(c) // true
```

#### `findAll`

Will return a list of children which match a selector pattern or predicate function.

```js
const a = el("div", {
  className: "test"
});
const b = el("div", { className: "menu-item" });
const c = el("div", { className: "menu-item" });
a.append([b, c]);
a.findAll(".menu-item") // [b, c]
```

```js
const a = el("div", {
  className: "test"
});
const b = el("div", { className: "menu-item" });
const c = el("div", { className: "menu-item" });
a.append([b, c]);
a.findAll((node) => node.is(".menu-item")) // [b, c]
```

#### `find`

Will return the first child which matches a selector pattern or predicate function.

```js
const a = el("div", {
  className: "test"
});
const b = el("div", { className: "menu-item" });
const c = el("div", { className: "menu-item" });
a.append([b, c]);
a.find(".menu-item") // b
```

```js
const a = el("div", {
  className: "test"
});
const b = el("div", { className: "menu-item" });
const c = el("div", { className: "menu-item" });
a.append([b, c]);
a.find((node) => node.is("menu-item")); // b
```

#### `getNode`

Will return the node, this is useful for components with deeply nested structures where you want to pick out the root node.

```js
const a = el(Menu);
a.getNode(); // { tagName: "div", attributes: { className: "menu" } ...}
```

#### `html`

Can return the inner html of an element and can be used to replace the contents of an element.

```js
const a = el("div").html("<span class=\"test\"/>);
a.childNodes[0] // { tagName: "span", attributes: { className: "test" } ...}
a.html(); // <span class="test"></span>
```

#### `is`

Returns a boolean value for whether a node matches a selector pattern.

```js
const a = el("div", {
  id: "my-div",
  className: "my-class-name"
});
a.is("#my-div.my-class-name") // true;
```

#### `parent`

Returns the node's `parentNode`

```js
const a = el("div", {
  className: "my-parent"
});

const b = el("div", {
  className: "my-child"
});

a.append(b);
b.parent(); // a
```

#### `parents`

Returns a list of the node's parents.

```js
const a = el("div", {
  className: "my-parent"
});

const b = el("div", {
  className: "my-child"
});

const c = el("div", {
  className: "my-second-child"
});

a.append(b.append(c));
c.parents(); // [b, a]
```

#### `prepend`

Will prepend a node to a parent node. Resulting in it being the first child.

```js
const a = el("div", {
  className: "my-parent"
});

const b = el("div", {
  className: "my-child"
});

const c = el("div", {
  className: "my-second-child"
});

a.append(b);
a.prepend(c);
a.childNodes[0]; // c
```

#### `previous`

Will return the sibling node that is at an index of n-1

```js
const a = el("div", {
  className: "my-parent"
});

const b = el("div", {
  className: "my-child"
});

const c = el("div", {
  className: "my-second-child"
});

a.append([b, c]);
c.previous(); // b
```

#### `previousNodes`

Will return a list of sibling nodes that are at index of n-x

```js
const a = el();
const b = el();
const c = el();
const d = el();

a.append([b, c, d]);
d.previousNodes(); // [c, b]
```

#### `removeChild`

Will remove the child node of a parent.

```js
const a = el();
const b = el();

a.append(b);
a.removeChild(b);
```

```js
const a = el();
const b = el();
const c = el();

a.append(b.append(c));
a.removeChild(c);
```

#### `removeClass`

Will remove the class if it exists on the element.

```js
const a = el("div", {
  className: "my-parent"
});
a.removeClass("my-parent");
a.attr("class"); // []
```

#### `remove`

Will remove the node from its parent element.

```js
const a = el();
const b = el();
a.append(b);
b.remove();
a.childNodes; // []
```

#### `replaceWith`

Will replace a node with another node (parent node is not required).

```js
const a = el();
const b = el();
const c = el();
a.append(b);
b.replaceWith(c);
a.childNodes; // [c]
```

#### `siblings`

Will return a list of sibling nodes.

```js
const a = el();
const b = el();
const c = el();
a.append([b, c]);
a.siblings(); // [b, c]
```

#### `style`

Will set the style value for a node.

- `style(property: string, value: string)`

```js
const a = el();
a.style({
  display: "none"
});
```

- `style(value: object)`

```js
const a = el();
a.style("display", "none");
```

#### `text`

- `text(value: string)` - Will replace the `childNode` array with a text string.

```js
const a = el();
a.text("text");
a.childNodes[0] // "text"
```

- `text()` - Will return the text value of the node

```js
const a = el(["text"]);
a.text() // "text"
```

#### `toFile`

- `toFile(filename: string)` - Will write the HTML value of a node to a file. Uses `writeFileSync`.

#### `toHtml`

- `toHtml()` - Returns the HTML string of a node.

#### `toJSON`

- `toJSON()` - Returns a valid JSON representation of the node.