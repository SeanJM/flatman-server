module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/component.js":
/*!********************************!*\
  !*** ./src/class/component.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = class Component {\n  /**\n   * @param {object} props - The component properties\n  */\n  constructor(props = {}) {\n    this.props = props;\n    this.ref = props.ref;\n    this.refs = {};\n    this.state = {};\n    this.__subscribers = {\n      onComponentDidUpdate: [],\n      onComponentWillUpdate: []\n    };\n  }\n\n  /**\n   * @param {object} state - The new component state\n  */\n  setState(state) {\n    const prevProps = this.props;\n    const prevState = this.state;\n    this.state = state;\n    this.__emitComponentDidUpdate(prevProps, prevState);\n  }\n\n  __subscribeComponentDidUpdate(callback) {\n    this.__subscribers.onComponentDidUpdate.push(callback);\n  }\n\n  __emitBeforeComponentToHtml(node) {\n    if (typeof this.beforeComponentToHtml === \"function\") {\n      this.beforeComponentToHtml(node);\n    }\n  }\n\n  __emitAfterComponentToHtml(node) {\n    if (typeof this.afterComponentToHtml === \"function\") {\n      this.afterComponentToHtml(node);\n    }\n  }\n\n  __emitComponentDidUpdate(state, prevState) {\n    let i = -1;\n    const n = this.__subscribers.onComponentDidUpdate.length;\n    while (++i < n) {\n      this.__subscribers.onComponentDidUpdate[i](state, prevState);\n    }\n  }\n\n  __isComponent() {\n    return true;\n  }\n};\n\n//# sourceURL=webpack:///./src/class/component.js?");

/***/ }),

/***/ "./src/class/virtual-dom.js":
/*!**********************************!*\
  !*** ./src/class/virtual-dom.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst is = __webpack_require__(/*! ../tools/is */ \"./src/tools/is.js\");\nconst VNode = __webpack_require__(/*! ./virtual-node */ \"./src/class/virtual-node.js\");\n\nfunction indexDocument(vnode, parentNode) {\n  return vnode instanceof VNode ? {\n    vnode: vnode,\n    tagName: vnode.tagName,\n    attributes: vnode.attributes,\n    parentNode,\n    children: vnode.children.map(childNode => indexDocument(childNode, vnode))\n  } : vnode;\n}\n\nmodule.exports = class VDOM {\n  /**\n   * @param {VNode} document - The nodes tagName\n   * @param {object} attributes - The nodes attributes\n   * @param {array} children - An array of children, strings or elements\n   * */\n  constructor(document) {\n    this.document = indexDocument(document);\n  }\n\n  find(selector) {\n    function findElement(element, predicate) {\n      if (predicate(element)) {\n        return element;\n      } else if (element.children) {\n        let res;\n        let i = -1;\n        const n = element.children;\n\n        while (++i < n) {\n          res = findElement(element.children[i], predicate);\n          if (res) {\n            return res;\n          }\n        }\n      }\n\n      return null;\n    }\n\n    if (typeof selector === \"function\") {\n      return findElement(this.document, selector);\n    }\n\n    return findElement(this.document, element => is(element, selector));\n  }\n\n  findAll(selector) {\n    const result = [];\n\n    function findElement(element, predicate) {\n      if (predicate(element)) {\n        result.push(element);\n      }\n\n      if (element.children) {\n        let i = -1;\n        const n = element.children;\n\n        while (++i < n) {\n          findElement(element.children[i], predicate);\n        }\n      }\n\n      return null;\n    }\n\n    if (typeof selector === \"function\") {\n      findElement(this.document, selector);\n    }\n\n    findElement(this.document, element => is(element, selector));\n\n    return result;\n  }\n};\n\n//# sourceURL=webpack:///./src/class/virtual-dom.js?");

/***/ }),

/***/ "./src/class/virtual-node.js":
/*!***********************************!*\
  !*** ./src/class/virtual-node.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = class VNode {\n  /**\n   * @param {string} tagName - The nodes tagName\n   * @param {object} attributes - The nodes attributes\n   * @param {array} children - An array of children, strings or elements\n   * */\n  constructor(tagName, attributes, children) {\n    this.props = Object.assign({}, attributes, { children });\n    this.tagName = tagName;\n    this.attributes = {};\n    this.children = children;\n    this.refs = {};\n\n    if (typeof tagName === \"function\" && tagName.prototype.__isComponent) {\n      this.__factory = new tagName(this.props);\n    }\n\n    for (var k in attributes) {\n      if (k === \"ref\") {\n        this.ref = attributes[k];\n      } else {\n        this.attributes[k] = attributes[k];\n      }\n    }\n  }\n\n  expandComponent() {\n    const vnode = this.__factory ? this.__factory.render(this.props).expand() : this.tagName(this.props).expand();\n\n    if (this.__factory) {\n      vnode.__factory = this.__factory;\n    }\n\n    return vnode;\n  }\n\n  expandElement() {\n    this.children = this.children.map(vnode => {\n      const vnodeElement = vnode.expand ? vnode.expand() : vnode;\n      return vnodeElement;\n    });\n    return this;\n  }\n\n  expand() {\n    return typeof this.tagName === \"function\" ? this.expandComponent() : this.expandElement();\n  }\n\n  toJSON() {\n    return {\n      tagName: this.tagName,\n      attributes: this.attributes,\n      children: this.children.map(child => child.toJSON ? child.toJSON() : child)\n    };\n  }\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node.js?");

/***/ }),

/***/ "./src/components/css.js":
/*!*******************************!*\
  !*** ./src/components/css.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { el } = __webpack_require__(/*! ../tools */ \"./src/tools/index.js\");\nconst Component = __webpack_require__(/*! ../class/component */ \"./src/class/component.js\");\n\nmodule.exports = class Css extends Component {\n  render(props) {\n    let file = /css$/.test(props.src) ? props.src : props.src + \".css\";\n    return el(\"link\", {\n      rel: \"stylesheet\",\n      href: file\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/components/css.js?");

/***/ }),

/***/ "./src/components/html.js":
/*!********************************!*\
  !*** ./src/components/html.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst el = __webpack_require__(/*! ../create/create-element */ \"./src/create/create-element.js\");\nconst Component = __webpack_require__(/*! ../class/component */ \"./src/class/component.js\");\nconst VNode = __webpack_require__(/*! ../class/virtual-node */ \"./src/class/virtual-node.js\");\n\nfunction Body(props) {\n  const children = [].concat(props.children);\n\n  if (props.scripts) {\n    [].concat(props.scripts).forEach(a => a instanceof VNode ? children.push(a) : children.push(el(\"script\", { src: a })));\n  }\n\n  return el(\"body\", { className: props.className }, children);\n}\n\nfunction Head(props) {\n  const children = [];\n\n  children.push(el(\"meta\", { httpEquiv: \"X-UX-Compatible\", content: \"IE=edge,chrome=1\" }), el(\"meta\", { charset: \"UTF-8\" }));\n\n  if (props.supportMobile) {\n    children.push(el(\"meta\", {\n      name: \"viewport\",\n      content: [\"width=device-width\", \"initial-scale=1\", \"maximum-scale=1\", \"user-scalable=0\"].join(\", \")\n    }));\n  }\n\n  if (props.favicon) {\n    Array.prototype.push.apply(children, props.favicon);\n  }\n\n  if (props.styles) {\n    [].concat(props.styles).forEach(a => {\n      children.push(a instanceof VNode ? a : el(\"link\", {\n        rel: \"stylesheet\",\n        type: \"text/css\",\n        href: a\n      }));\n    });\n  }\n\n  if (props.meta) {\n    [].concat(props.meta).forEach(a => {\n      children.push(a);\n    });\n  }\n\n  if (props.head) {\n    Array.prototype.push.apply(children, props.head);\n  }\n\n  if (props.title) {\n    children.push(el(\"title\", [props.title]));\n  }\n\n  return el(\"head\", {\n    ref: \"head\"\n  }, children);\n}\n\nmodule.exports = class Html extends Component {\n  /**\n   * @param {object} props\n   * @param {array} props.scripts\n   * @param {array} props.styles\n   * @param {boolean} props.supportMobile\n  */\n  constructor(props) {\n    super(props);\n    this.state = {};\n  }\n\n  render(props) {\n    return el(\"fragment\", [el(\"doctype\"), el(\"html\", [el(Head, props), el(Body, props, props.children)])]);\n  }\n};\n\n//# sourceURL=webpack:///./src/components/html.js?");

/***/ }),

/***/ "./src/create/create-element.js":
/*!**************************************!*\
  !*** ./src/create/create-element.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst VNode = __webpack_require__(/*! ../class/virtual-node */ \"./src/class/virtual-node.js\");\nconst kebabCase = __webpack_require__(/*! ../tools/kebab-case */ \"./src/tools/kebab-case.js\");\n\nfunction filterCreatedAttributes(attr) {\n  const result = {};\n  for (var k in attr) {\n    if (k === \"class\" || k === \"className\") {\n      result.className = attr[k];\n    } else if (k === \"data\") {\n      for (var g in attr[k]) {\n        result[kebabCase(\"data-\" + g)] = attr[k][g];\n      }\n    } else if (k.indexOf(\"xlink:\") === 0) {\n      result[k] = attr[k];\n    } else {\n      result[kebabCase(k)] = attr[k];\n    }\n  }\n  return result;\n}\n\nfunction isValidChild(element) {\n  return element instanceof VNode || typeof element === \"string\" || typeof element === \"number\";\n}\n\nfunction createElement() {\n  const args = [\"div\", {}, []];\n  const n = arguments.length;\n  let i = -1;\n\n  while (++i < n) {\n    if (typeof arguments[i] === \"string\" && i === 0 || typeof arguments[i] === \"function\") {\n      args[0] = arguments[i];\n    } else if (Array.isArray(arguments[i])) {\n      arguments[i].forEach(childNode => {\n        if (isValidChild(childNode)) {\n          args[2].push(childNode);\n        }\n      });\n    } else if (isValidChild(arguments[i])) {\n      args[2].push(arguments[i]);\n    } else if (typeof arguments[i] === \"object\" && arguments[i] != null) {\n      args[1] = arguments[i];\n    }\n  }\n\n  args[1] = filterCreatedAttributes(args[1]);\n  return new VNode(args[0], args[1], args[2]);\n}\n\nmodule.exports = createElement;\n\n//# sourceURL=webpack:///./src/create/create-element.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Component = __webpack_require__(/*! ./class/component */ \"./src/class/component.js\");\nconst el = __webpack_require__(/*! ./create/create-element */ \"./src/create/create-element.js\");\n\nel.Component = Component;\nel.Html = __webpack_require__(/*! ./components/html */ \"./src/components/html.js\");\nel.Css = __webpack_require__(/*! ./components/css */ \"./src/components/css.js\");\nel.VNode = __webpack_require__(/*! ./class/virtual-node */ \"./src/class/virtual-node.js\");\nel.render = __webpack_require__(/*! ./render */ \"./src/render/index.js\");\n\nmodule.exports = el;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/render/html-attribute-to-string.js":
/*!************************************************!*\
  !*** ./src/render/html-attribute-to-string.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nError: ENOENT: no such file or directory, open '/Users/sean/Dropbox/projects/flatman-server/src/render/html-attribute-to-string.js'\");\n\n//# sourceURL=webpack:///./src/render/html-attribute-to-string.js?");

/***/ }),

/***/ "./src/render/index.js":
/*!*****************************!*\
  !*** ./src/render/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst VDOM = __webpack_require__(/*! ../class/virtual-dom */ \"./src/class/virtual-dom.js\");\nconst { commentToHtml } = __webpack_require__(/*! ../tools */ \"./src/tools/index.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst htmlAttributeToString = __webpack_require__(/*! ./html-attribute-to-string */ \"./src/render/html-attribute-to-string.js\");\n\nconst isOpen = {\n  \"hr\": true,\n  \"img\": true,\n  \"input\": true,\n  \"link\": true,\n  \"meta\": true,\n  \"doctype\": true\n};\n\nconst isSelfClosing = {\n  \"circle\": true,\n  \"line\": true,\n  \"ellipsis\": true,\n  \"path\": true,\n  \"polygon\": true,\n  \"rect\": true\n};\n\nconst attrList = [\"id\", \"className\", \"name\", \"title\", \"style\"];\n\nfunction sortAttributes(a, b) {\n  const aI = attrList.indexOf(a);\n  const bI = attrList.indexOf(b);\n\n  if (aI > -1 && bI > -1) {\n    return aI - bI;\n  } else if (aI > -1) {\n    return -1;\n  } else if (bI > -1) {\n    return 1;\n  }\n  return 0;\n}\n\nfunction getAttr(node) {\n  const attributes = node.attributes;\n  const list = attributes ? Object.keys(attributes).sort(sortAttributes) : [];\n  let a = [];\n\n  list.forEach(function (attribute) {\n    if (typeof attributes[attribute] !== \"undefined\" && attributes[attribute] != null) {\n      a.push(htmlAttributeToString(attribute, attributes[attribute]));\n    }\n  });\n\n  a = a.filter(a => a.length);\n\n  if (a.length) {\n    return \" \" + a.join(\" \");\n  }\n\n  return \"\";\n}\n\nfunction fragmentToHtml(vnode, depth) {\n  return vnode.children.map(childVNode => elementToHtml(childVNode, depth)).join(\"\");\n}\n\nfunction doctypeToHtml(vnode) {\n  let res = \"<!DOCTYPE \";\n  const attr = getAttr(vnode);\n  res += attr || \"HTML\";\n  res += \">\\n\";\n  return res;\n}\n\nfunction nodeToHtml(node, depth) {\n  const tab = new Array(depth + 1).join(\"  \");\n  let s = [];\n  let children = node.children;\n\n  if (node.__factory && node.__factory.__emitBeforeComponentToHtml) {\n    node.__factory.__emitBeforeComponentToHtml(new VDOM(node));\n  }\n\n  s.push(tab);\n\n  if (node.tagName === \"xml\") {\n    s.push(\"<?\", node.tagName, getAttr(node));\n  } else {\n    s.push(\"<\", node.tagName, getAttr(node));\n  }\n\n  if (node.tagName === \"comment\") {\n    s = [commentToHtml(node, depth)];\n  } else if (node.tagName === \"doctype\") {\n    s = [doctypeToHtml(node, depth)];\n  } else if (node.tagName === \"xml\") {\n    s.push(\"?>\\n\");\n  } else if (node.tagName === \"fragment\") {\n    s = [fragmentToHtml(node, depth)];\n  } else if (isOpen[node.tagName]) {\n    s.push(\">\\n\");\n  } else if (isSelfClosing[node.tagName] || children && !children.length) {\n    s.push(\"/>\\n\");\n  } else {\n    s.push(\">\\n\");\n\n    children.forEach(childVNode => {\n      if (childVNode.tagName) {\n        s.push(elementToHtml(childVNode, depth + 1));\n      } else {\n        (typeof childVNode === \"number\" ? childVNode + \"\" : childVNode).split(\"\\n\").forEach(string => {\n          s.push(new Array(depth + 2).join(\"  \"), string, \"\\n\");\n        });\n      }\n    });\n\n    s.push(tab);\n    s.push(\"</\" + node.tagName + \">\\n\");\n  }\n\n  if (node.__factory && node.__factory.__emitAfterComponentToHtml) {\n    node.__factory.__emitAfterComponentToHtml(s.join(\"\"));\n  }\n\n  return s.join(\"\");\n}\n\nfunction textToHtml(node, depth) {\n  const tab = new Array(depth + 1).join(\"  \");\n  return node.split(\"\\n\").map(string => tab + string + \"\\n\");\n}\n\nfunction elementToHtml(node, depth) {\n  if (node.tagName) {\n    return nodeToHtml(node, depth);\n  }\n  return textToHtml(node, depth);\n}\n\nfunction wrapLifecycle(vnode) {\n  const vdom = vnode.expand();\n  return elementToHtml(vdom, 0);\n}\n\nfunction render(vnode, filename) {\n  let initialRender;\n  let finalRender;\n\n  if (vnode.__factory) {\n    vnode.__factory.__subscribeComponentDidUpdate(() => {\n      finalRender = wrapLifecycle(vnode);\n    });\n  }\n\n  initialRender = wrapLifecycle(vnode);\n\n  if (filename) {\n    fs.writeFileSync(filename, finalRender || initialRender, \"utf8\");\n  }\n\n  return finalRender || initialRender;\n}\n\nmodule.exports = render;\n\n//# sourceURL=webpack:///./src/render/index.js?");

/***/ }),

/***/ "./src/tools/camel-case.js":
/*!*********************************!*\
  !*** ./src/tools/camel-case.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst space = {\n  \" \": true,\n  \"\\t\": true,\n  \"\\n\": true,\n  \"_\": true,\n  \"-\": true\n};\n\nconst letter = {\n  \"A\": true,\n  \"B\": true,\n  \"C\": true,\n  \"D\": true,\n  \"E\": true,\n  \"F\": true,\n  \"G\": true,\n  \"H\": true,\n  \"I\": true,\n  \"J\": true,\n  \"K\": true,\n  \"L\": true,\n  \"M\": true,\n  \"N\": true,\n  \"O\": true,\n  \"P\": true,\n  \"Q\": true,\n  \"R\": true,\n  \"S\": true,\n  \"T\": true,\n  \"U\": true,\n  \"V\": true,\n  \"W\": true,\n  \"X\": true,\n  \"Y\": true,\n  \"Z\": true,\n  \"a\": true,\n  \"b\": true,\n  \"c\": true,\n  \"d\": true,\n  \"e\": true,\n  \"f\": true,\n  \"g\": true,\n  \"h\": true,\n  \"i\": true,\n  \"j\": true,\n  \"k\": true,\n  \"l\": true,\n  \"m\": true,\n  \"n\": true,\n  \"o\": true,\n  \"p\": true,\n  \"q\": true,\n  \"r\": true,\n  \"s\": true,\n  \"t\": true,\n  \"u\": true,\n  \"v\": true,\n  \"w\": true,\n  \"x\": true,\n  \"y\": true,\n  \"z\": true,\n  \"0\": true,\n  \"1\": true,\n  \"2\": true,\n  \"3\": true,\n  \"4\": true,\n  \"5\": true,\n  \"6\": true,\n  \"7\": true,\n  \"8\": true,\n  \"9\": true\n};\n\nmodule.exports = function camelCase(str) {\n  let kebabbed = \"\";\n  let i = -1;\n  const n = str.length;\n  while (++i < n) {\n    if (i === 0) {\n      kebabbed += str[i].toLowerCase();\n    } else if (letter[str[i]] && space[str[i - 1]]) {\n      kebabbed += str[i].toUpperCase();\n    } else if (letter[str[i]]) {\n      kebabbed += str[i].toLowerCase();\n    }\n  }\n  return kebabbed;\n};\n\n//# sourceURL=webpack:///./src/tools/camel-case.js?");

/***/ }),

/***/ "./src/tools/comment-to-html.js":
/*!**************************************!*\
  !*** ./src/tools/comment-to-html.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function commentToHtml(element, depth) {\n  const tab = new Array(depth + 1).join(\"  \");\n  const s = [];\n  let c = element.childNodes;\n\n  s[0] = tab;\n\n  if (!element.parentNode || element.parentNode.tagName !== \"comment\") {\n    s[1] = \"<!--\";\n  }\n\n  if (c.length === 1) {\n    s.push(c.map(x => x.tagName === \"comment\" ? commentToHtml(x, 0) : x.tagName ? x.toHtml() : x).join(\"\\n\"));\n  } else {\n    s.push(c.map((x, i) => {\n      const tab = i > 0 ? new Array(depth + 1).join(\"  \") + \"    \" : \"\";\n      return x.tagName === \"comment\" ? tab + commentToHtml(x, depth + 1) : x.tagName ? x.toHtml(depth + 1) : tab + x;\n    }).join(\"\\n\"));\n  }\n\n  if (!element.parentNode || element.parentNode.tagName !== \"comment\") {\n    s.push(\"-->\\n\");\n  }\n\n  return s.join(\"\");\n};\n\n//# sourceURL=webpack:///./src/tools/comment-to-html.js?");

/***/ }),

/***/ "./src/tools/get-selector-group.js":
/*!*****************************************!*\
  !*** ./src/tools/get-selector-group.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function getSelectorGroup(s) {\n  var group = [];\n  var open = false;\n  var n = s.length;\n  var i = 0;\n  var cur = \"\";\n\n  s = s.replace(/\\s+/g, \" \");\n\n  while (i < n) {\n    if (s[i] === \"[\" && s[i - 1] !== \"'\") {\n      open = true;\n      cur += s[i];\n    } else if (s[i] === \"]\" && s[i - 1] !== \"'\") {\n      open = false;\n      cur += s[i];\n    } else if (s[i] === \" \" && !open) {\n      group.push(cur);\n      cur = \"\";\n    } else {\n      cur += s[i];\n    }\n    i++;\n  }\n\n  group.push(cur);\n  return group;\n};\n\n//# sourceURL=webpack:///./src/tools/get-selector-group.js?");

/***/ }),

/***/ "./src/tools/get-selector-object.js":
/*!******************************************!*\
  !*** ./src/tools/get-selector-object.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function getSelectorObject(selector) {\n  let classes = selector.match(/\\.[a-zA-Z0-9\\-\\_]+/g);\n  let id = selector.match(/\\#[a-zA-Z0-9\\-\\_]+/);\n  let attr = selector.match(/\\[[^\\]]+?\\]/g);\n  let tagName = selector.match(/^[a-zA-Z0-9\\-\\_]+/);\n\n  let selectorObject = {\n    selector: selector,\n    tagName: tagName ? tagName[0] : false,\n    attributes: {}\n  };\n\n  if (classes) {\n    selectorObject.attributes.className = classes.map(a => a.slice(1));\n  }\n\n  if (id) {\n    selectorObject.attributes.id = id[0].slice(1);\n  }\n\n  if (attr) {\n    attr.forEach(function (string) {\n      let value = string.match(/\\[([a-zA-Z0-9\\-\\_]+)(?:(\\*|\\^|\\$|)=([^\\]]+?)\\]|)/);\n      value[1] = value[1] === \"class\" ? \"className\" : value[1];\n      value[3] = value[3] ? value[3].slice(1, -1) : false;\n\n      if (value[2]) {\n        if (value[2] === \"*\") {\n          selectorObject.attributes[value[1]] = new RegExp(value[3]);\n        } else if (value[2] === \"^\") {\n          selectorObject.attributes[value[1]] = new RegExp(\"^\" + value[3]);\n        } else if (value[2] === \"$\") {\n          selectorObject.attributes[value[1]] = new RegExp(value[3] + \"$\");\n        }\n      } else if (value[3]) {\n        selectorObject.attributes[value[1]] = new RegExp(\"^\" + value[3] + \"$\");\n      } else {\n        selectorObject.attributes[value[1]] = new RegExp(\".+\");\n      }\n    });\n  }\n\n  return selectorObject;\n};\n\n//# sourceURL=webpack:///./src/tools/get-selector-object.js?");

/***/ }),

/***/ "./src/tools/index.js":
/*!****************************!*\
  !*** ./src/tools/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  commentToHtml: __webpack_require__(/*! ./comment-to-html */ \"./src/tools/comment-to-html.js\"),\n\n  getSelectorGroup: __webpack_require__(/*! ./get-selector-group */ \"./src/tools/get-selector-group.js\"),\n  getSelectorObject: __webpack_require__(/*! ./get-selector-object */ \"./src/tools/get-selector-object.js\"),\n\n  kebabCase: __webpack_require__(/*! ./kebab-case */ \"./src/tools/kebab-case.js\"),\n  camelCase: __webpack_require__(/*! ./camel-case */ \"./src/tools/camel-case.js\"),\n  setRefs: __webpack_require__(/*! ./set-refs */ \"./src/tools/set-refs.js\")\n};\n\n//# sourceURL=webpack:///./src/tools/index.js?");

/***/ }),

/***/ "./src/tools/is.js":
/*!*************************!*\
  !*** ./src/tools/is.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst getSelectorObject = __webpack_require__(/*! ./get-selector-object */ \"./src/tools/get-selector-object.js\");\n\nfunction getSiblings(node) {\n  return node && node.parentNode ? node.parentNode.children : [];\n}\n\nfunction previous(node) {\n  const siblings = getSiblings(node);\n  const indexOf = siblings.indexOf(node);\n  return siblings[indexOf - 1];\n}\n\nfunction isClassName(node, matchList) {\n  const className = node.attributes.className;\n  const classList = className ? className.split(\" \") : [];\n  const classMatch = [];\n\n  let i = -1;\n  const n = classList.length;\n\n  while (++i < n) {\n    if (matchList.indexOf(classList[i]) > -1) {\n      classMatch.push(classList[i]);\n    }\n  }\n\n  return classMatch.length === matchList.length;\n}\n\nfunction elementIs(node, selectorAttributes) {\n  if (!node || typeof node === \"string\") {\n    return false;\n  }\n\n  if (selectorAttributes.tagName) {\n    if (selectorAttributes.tagName !== node.tagName) {\n      return false;\n    }\n  }\n\n  for (var k in selectorAttributes.attributes) {\n    if (k === \"className\") {\n      if (!isClassName(node, selectorAttributes.attributes[k])) {\n        return false;\n      }\n    } else if (selectorAttributes.attributes[k]) {\n      if (typeof selectorAttributes.attributes[k] === \"string\") {\n        if (selectorAttributes.attributes[k] !== node.attributes[k]) {\n          return false;\n        }\n      } else if (!selectorAttributes.attributes[k].test(node.attributes[k])) {\n        return false;\n      }\n    }\n  }\n\n  if (selectorAttributes.selector === \"+\") {\n    return false;\n  } else if (selectorAttributes.selector === \"~\") {\n    return false;\n  }\n\n  return true;\n}\n\nfunction elementPathIs(node, selectors) {\n  const n = selectors.length - 1;\n\n  for (var i = n; i >= 0; i--) {\n    if (selectors[i].selector === \"+\") {\n      selectors.pop();\n      node = previous(node);\n    } else if (selectors[i].selector === \"~\") {\n      selectors.pop();\n      node = node && getSiblings(node).filter(x => elementIs(x, selectors[i - 1]))[0];\n    } else if (selectors[i].selector === \">\") {\n      selectors.pop();\n      node = node && node.parentNode;\n    } else if (elementIs(node, selectors[i])) {\n      selectors.pop();\n    } else if (node && i < n) {\n      node = node.parentNode;\n      i += 1;\n    } else if (i === n) {\n      return false;\n    }\n  }\n\n  return selectors.length === 0;\n}\n\n/**\n * @param {object} node - Virtual node\n * @param {string} selector - The selector to query\n*/\nfunction is(node, selector) {\n  const selectors = selector.split(\" \").map(a => getSelectorObject(a.trim()));\n  if (selectors.length === 1) {\n    return elementIs(node, selectors[0]);\n  } else {\n    return elementPathIs(node, selectors);\n  }\n}\n\nmodule.exports = is;\n\n//# sourceURL=webpack:///./src/tools/is.js?");

/***/ }),

/***/ "./src/tools/kebab-case.js":
/*!*********************************!*\
  !*** ./src/tools/kebab-case.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst space = {\n  \" \": true,\n  \"\\t\": true,\n  \"\\n\": true\n};\n\nconst upper = {\n  \"A\": true,\n  \"B\": true,\n  \"C\": true,\n  \"D\": true,\n  \"E\": true,\n  \"F\": true,\n  \"G\": true,\n  \"H\": true,\n  \"I\": true,\n  \"J\": true,\n  \"K\": true,\n  \"L\": true,\n  \"M\": true,\n  \"N\": true,\n  \"O\": true,\n  \"P\": true,\n  \"Q\": true,\n  \"R\": true,\n  \"S\": true,\n  \"T\": true,\n  \"U\": true,\n  \"V\": true,\n  \"W\": true,\n  \"X\": true,\n  \"Y\": true,\n  \"Z\": true\n};\n\nconst lower = {\n  \"a\": true,\n  \"b\": true,\n  \"c\": true,\n  \"d\": true,\n  \"e\": true,\n  \"f\": true,\n  \"g\": true,\n  \"h\": true,\n  \"i\": true,\n  \"j\": true,\n  \"k\": true,\n  \"l\": true,\n  \"m\": true,\n  \"n\": true,\n  \"o\": true,\n  \"p\": true,\n  \"q\": true,\n  \"r\": true,\n  \"s\": true,\n  \"t\": true,\n  \"u\": true,\n  \"v\": true,\n  \"w\": true,\n  \"x\": true,\n  \"y\": true,\n  \"z\": true\n};\n\nconst number = {\n  \"0\": true,\n  \"1\": true,\n  \"2\": true,\n  \"3\": true,\n  \"4\": true,\n  \"5\": true,\n  \"6\": true,\n  \"7\": true,\n  \"8\": true,\n  \"9\": true\n};\n\nmodule.exports = function kebabCase(str) {\n  let kebabbed = \"\";\n  let i = -1;\n  const n = str.length;\n  while (++i < n) {\n    if (upper[str[i]]) {\n      kebabbed += (i > 0 && !space[str[i - 1]] ? \"-\" : \"\") + str[i].toLowerCase();\n    } else if (lower[str[i]] || number[str[i]] || str[i] === \"-\") {\n      kebabbed += str[i];\n    } else if (space[str[i]] && !space[str[i - 1]]) {\n      kebabbed += \"-\";\n    }\n  }\n  return kebabbed;\n};\n\n//# sourceURL=webpack:///./src/tools/kebab-case.js?");

/***/ }),

/***/ "./src/tools/set-refs.js":
/*!*******************************!*\
  !*** ./src/tools/set-refs.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function setRefs(child) {\n  const cr = child && child.ref;\n\n  if (cr && !this.refs[cr]) {\n    this.refs[cr] = child;\n  }\n\n  for (var k in child.refs) {\n    if (!this.refs[k]) {\n      this.refs[k] = child.refs[k];\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/tools/set-refs.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ })["default"];