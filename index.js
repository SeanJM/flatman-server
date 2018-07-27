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
eval("\n\nconst VNode = __webpack_require__(/*! ./virtual-node */ \"./src/class/virtual-node.js\");\n\nfunction extendPrototype(method) {\n  return function () {\n    const n = arguments.length;\n    const a = new Array(n);\n    const node = this.getNode();\n    let i = -1;\n    let res;\n\n    while (++i < n) {\n      a[i] = arguments[i];\n    }\n\n    if (this.node[method]) {\n      res = this.node[method].apply(this.node, a);\n    } else {\n      res = VNode.prototype[method].apply(node, a);\n    }\n\n    return res === node ? this : res;\n  };\n}\n\nfunction extendElement(C) {\n  for (var k in VNode.prototype) {\n    if (!C.prototype[k]) {\n      C.prototype[k] = extendPrototype(k);\n    }\n  }\n  return C;\n}\n\nclass Component {\n  constructor(props = {}) {\n    this.props = props;\n    this.ref = props.ref;\n    this.refs = {};\n  }\n\n  toJSON() {\n    return {\n      tagName: this.tagName.name,\n      props: this.props,\n      node: this.node.toJSON()\n    };\n  }\n}\n\nmodule.exports = extendElement(Component);\n\n//# sourceURL=webpack:///./src/class/component.js?");

/***/ }),

/***/ "./src/class/virtual-node.js":
/*!***********************************!*\
  !*** ./src/class/virtual-node.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst is = __webpack_require__(/*! ./virtual-node/is */ \"./src/class/virtual-node/is.js\");\nconst elementToHtml = __webpack_require__(/*! ./virtual-node/element-to-html */ \"./src/class/virtual-node/element-to-html.js\");\nconst elementToVNodeTree = __webpack_require__(/*! ./virtual-node/element-to-vnode-tree */ \"./src/class/virtual-node/element-to-vnode-tree.js\");\n\nmodule.exports = class VNode {\n  /**\n   * @param {string} tagName - The nodes tagName\n   * @param {object} attributes - The nodes attributes\n   * @param {array} children - An array of children, strings or elements\n   * */\n  constructor(tagName, attributes, children) {\n    this.tagName = tagName;\n    this.attributes = {};\n    this.children = children;\n    this.refs = {};\n\n    children.forEach(childNode => {\n      if (typeof childNode === \"object\") {\n        childNode.parentNode = this;\n      }\n    });\n\n    for (var k in attributes) {\n      if (k === \"ref\") {\n        this.ref = attributes[k];\n      } else {\n        this.attributes[k] = attributes[k];\n      }\n    }\n  }\n\n  is(selector) {\n    return is(this, selector);\n  }\n\n  toJSON() {\n    return {\n      tagName: this.tagName,\n      attributes: this.attributes,\n      children: this.children.map(child => child.toJSON ? child.toJSON() : child)\n    };\n  }\n\n  expandTree(depth = 0) {\n    return elementToVNodeTree(this, depth);\n  }\n\n  toHtml(depth = 0) {\n    // expandVNodeTree\n    const tree = this.expandTree();\n    // renderVNodeTree\n    return elementToHtml(tree, depth);\n  }\n\n  previous() {\n    const siblings = this.siblings();\n    return siblings[siblings.indexOf(this) - 1];\n  }\n\n  siblings() {\n    return this.parentNode ? this.parentNode.children : [];\n  }\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node.js?");

/***/ }),

/***/ "./src/class/virtual-node/component-to-html.js":
/*!*****************************************************!*\
  !*** ./src/class/virtual-node/component-to-html.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction componentClassToHtml(vnode, depth) {\n  const props = Object.assign({}, {\n    children: vnode.children\n  }, vnode.attributes);\n\n  const component = new vnode.tagName(props);\n  const vnodeElement = component.render(props);\n  let html;\n\n  vnodeElement.parentNode = vnode.parentNode;\n\n  if (component.beforeToHtml) {\n    component.beforeToHtml();\n  }\n\n  html = vnodeElement.toHtml(depth);\n\n  if (component.afterToHtml) {\n    component.afterToHtml();\n  }\n\n  return html;\n}\n\nfunction pureComponentToHtml(vnode, depth) {\n  const props = Object.assign({}, {\n    children: vnode.children\n  }, vnode.attributes);\n  const vnodeElement = vnode.tagName(props);\n\n  vnodeElement.parentNode = vnode.parentNode;\n  return vnodeElement.toHtml(depth);\n}\n\nmodule.exports = function componentToHtml(vnode, depth) {\n  if (vnode.tagName.prototype.render) {\n    return componentClassToHtml(vnode, depth);\n  }\n  return pureComponentToHtml(vnode, depth);\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node/component-to-html.js?");

/***/ }),

/***/ "./src/class/virtual-node/element-to-html.js":
/*!***************************************************!*\
  !*** ./src/class/virtual-node/element-to-html.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst componentToHtml = __webpack_require__(/*! ./component-to-html */ \"./src/class/virtual-node/component-to-html.js\");\nconst htmlToHtml = __webpack_require__(/*! ./html-to-html */ \"./src/class/virtual-node/html-to-html.js\");\n\nmodule.exports = function elementToHtml(vnode, depth = 0) {\n  // Is component\n  if (typeof vnode.tagName === \"function\") {\n    return componentToHtml(vnode, depth);\n  }\n  return htmlToHtml(vnode, depth);\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node/element-to-html.js?");

/***/ }),

/***/ "./src/class/virtual-node/element-to-vnode-tree.js":
/*!*********************************************************!*\
  !*** ./src/class/virtual-node/element-to-vnode-tree.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction componentClassToVNodeTree(vnode, depth) {\n  const props = Object.assign({}, {\n    children: vnode.children\n  }, vnode.attributes);\n\n  const component = new vnode.tagName(props);\n  const vnodeElement = component.render(props);\n  vnodeElement.depth = depth;\n  return vnodeElement;\n}\n\nfunction pureComponentToHtml(vnode, depth) {\n  const props = Object.assign({}, {\n    children: vnode.children\n  }, vnode.attributes);\n  const vnodeElement = vnode.tagName(props);\n  vnodeElement.depth = depth;\n  return vnodeElement;\n}\n\nfunction componentToVNodeTree(vnode, depth) {\n  if (vnode.tagName.prototype.render) {\n    return componentClassToVNodeTree(vnode, depth);\n  }\n  return pureComponentToHtml(vnode, depth);\n}\n\nmodule.exports = function elementToHtml(vnode, depth = 0) {\n  // Is component\n  if (typeof vnode.tagName === \"function\") {\n    return componentToVNodeTree(vnode, depth);\n  }\n  vnode.depth = depth;\n  return vnode;\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node/element-to-vnode-tree.js?");

/***/ }),

/***/ "./src/class/virtual-node/html-to-html.js":
/*!************************************************!*\
  !*** ./src/class/virtual-node/html-to-html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { commentToHtml, kebabCase } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nconst isOpen = {\n  \"hr\": true,\n  \"img\": true,\n  \"input\": true,\n  \"link\": true,\n  \"meta\": true,\n  \"doctype\": true\n};\n\nconst isSelfClosing = {\n  \"circle\": true,\n  \"line\": true,\n  \"ellipsis\": true,\n  \"path\": true,\n  \"polygon\": true,\n  \"rect\": true\n};\n\nconst attrList = [\"id\", \"className\", \"name\", \"title\", \"style\"];\n\nfunction sortAttributes(a, b) {\n  const aI = attrList.indexOf(a);\n  const bI = attrList.indexOf(b);\n\n  if (aI > -1 && bI > -1) {\n    return aI - bI;\n  } else if (aI > -1) {\n    return -1;\n  } else if (bI > -1) {\n    return 1;\n  }\n  return 0;\n}\n\nfunction toHtmlStyle(value) {\n  var styles = [];\n  for (var k in value) {\n    if (typeof value[k] === \"string\" || typeof value[k] === \"number\") {\n      styles.push(kebabCase(k) + \": \" + value[k]);\n    }\n  }\n  return styles.join(\";\");\n}\n\nfunction toHtmlAttribute(name, value) {\n  value = typeof value === \"number\" ? value.toString() : value;\n\n  if (typeof value === \"string\") {\n    value = value.trim();\n  }\n\n  if (name === \"style\") {\n    if (typeof value === \"object\" && Object.keys(value).length) {\n      return `${name}=\"${toHtmlStyle(value)}\"`;\n    }\n    return \"\";\n  } else if (name === \"className\") {\n    if (value.length) {\n      value = value.split(\" \").map(a => a.trim()).sort().join(\" \");\n      return `class=\"${value}\"`;\n    }\n    return \"\";\n  } else if (name === \"tabindex\") {\n    return `tabIndex=\"${value}\"`;\n  } else if (name.substr(0, 4) === \"data\") {\n    return `${kebabCase(name)}=\"${value}\"`;\n  } else if (name === \"viewBox\") {\n    return `viewBox=\"${value}\"`;\n  } else if (name.indexOf(\":\") !== -1) {\n    return `${name}=\"${value}\"`;\n  }\n  if (value && value.length) {\n    return `${kebabCase(name)}=\"${value}\"`;\n  }\n  return \"\";\n}\n\nfunction getAttr(node) {\n  const attributes = node.attributes;\n  const list = attributes ? Object.keys(attributes).sort(sortAttributes) : [];\n  let a = [];\n\n  list.forEach(function (attribute) {\n    if (typeof attributes[attribute] !== \"undefined\") {\n      a.push(toHtmlAttribute(attribute, attributes[attribute]));\n    }\n  });\n\n  a = a.filter(a => a.length);\n\n  if (a.length) {\n    return \" \" + a.join(\" \");\n  }\n\n  return \"\";\n}\n\nfunction fragmentToHtml(vnode, depth) {\n  return vnode.children.map(childVNode => {\n    if (childVNode.toHtml) {\n      return childVNode.toHtml(depth);\n    }\n    return childVNode.split(\"\\n\").map((string, i) => {\n      let response = \"\";\n      if (i > 0) {\n        response += \"\\n\";\n      }\n      response += new Array(depth + 1).join(\"  \");\n      response += string + \"\\n\";\n      return response;\n    });\n  }).join(\"\");\n}\n\nfunction doctypeToHtml(vnode) {\n  const s = [];\n  s.push(\"<!DOCTYPE\");\n  s.push(\" \");\n  s.push(getAttr(vnode));\n  if (!s[2].length) {\n    s[2] = \"HTML\";\n  }\n  s.push(\">\\n\");\n  return s.join(\"\");\n}\n\nmodule.exports = function elementToHtml(vnode, depth) {\n  const tab = new Array(depth + 1).join(\"  \");\n  const s = [];\n  let children = vnode.children;\n\n  s.push(tab);\n\n  if (vnode.tagName === \"xml\") {\n    s.push(\"<?\", vnode.tagName, getAttr(vnode));\n  } else {\n    s.push(\"<\", vnode.tagName, getAttr(vnode));\n  }\n\n  if (vnode.tagName === \"comment\") {\n    return commentToHtml(vnode, depth);\n  } else if (vnode.tagName === \"doctype\") {\n    return doctypeToHtml(vnode, depth);\n  } else if (vnode.tagName === \"xml\") {\n    s.push(\"?>\");\n  } else if (vnode.tagName === \"fragment\") {\n    return fragmentToHtml(vnode, depth);\n  } else if (isOpen[vnode.tagName]) {\n    s.push(\">\");\n  } else if (isSelfClosing[vnode.tagName] || children && !children.length) {\n    s.push(\"/>\");\n  } else {\n    s.push(\">\\n\");\n\n    children.forEach(childVNode => {\n      if (childVNode.tagName) {\n        s.push(childVNode.toHtml(depth + 1));\n      } else {\n        childVNode.split(\"\\n\").forEach(string => {\n          s.push(new Array(depth + 2).join(\"  \"), string, \"\\n\");\n        });\n      }\n    });\n\n    s.push(tab);\n    s.push(\"</\" + vnode.tagName + \">\");\n  }\n\n  s.push(\"\\n\");\n  return s.join(\"\");\n};\n\n//# sourceURL=webpack:///./src/class/virtual-node/html-to-html.js?");

/***/ }),

/***/ "./src/class/virtual-node/is.js":
/*!**************************************!*\
  !*** ./src/class/virtual-node/is.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { getSelectorObject } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nfunction isClassName(vnode, matchList) {\n  const className = vnode.attributes.className;\n  const classList = className ? className.split(\" \") : [];\n  const classMatch = [];\n\n  let i = -1;\n  const n = classList.length;\n\n  while (++i < n) {\n    if (matchList.indexOf(classList[i]) > -1) {\n      classMatch.push(classList[i]);\n    }\n  }\n\n  return classMatch.length === matchList.length;\n}\n\nfunction elementIs(vnode, selectorAttributes) {\n  if (!vnode || typeof vnode === \"string\") {\n    return false;\n  }\n\n  if (selectorAttributes.tagName) {\n    if (selectorAttributes.tagName !== vnode.tagName) {\n      return false;\n    }\n  }\n\n  for (var k in selectorAttributes.attributes) {\n    if (k === \"className\") {\n      if (!isClassName(vnode, selectorAttributes.attributes[k])) {\n        return false;\n      }\n    } else if (selectorAttributes.attributes[k]) {\n      if (typeof selectorAttributes.attributes[k] === \"string\") {\n        if (selectorAttributes.attributes[k] !== vnode.attributes[k]) {\n          return false;\n        }\n      } else if (!selectorAttributes.attributes[k].test(vnode.attributes[k])) {\n        return false;\n      }\n    }\n  }\n\n  if (selectorAttributes.selector === \"+\") {\n    return false;\n  } else if (selectorAttributes.selector === \"~\") {\n    return false;\n  }\n\n  return true;\n}\n\nfunction elementPathIs(vnode, selectors) {\n  const n = selectors.length - 1;\n\n  for (var i = n; i >= 0; i--) {\n    if (selectors[i].selector === \"+\") {\n      selectors.pop();\n      vnode = vnode && vnode.previous();\n    } else if (selectors[i].selector === \"~\") {\n      selectors.pop();\n      vnode = vnode && vnode.siblings().filter(x => elementIs(x, selectors[i - 1]))[0];\n    } else if (selectors[i].selector === \">\") {\n      selectors.pop();\n      vnode = vnode && vnode.parentNode;\n    } else if (elementIs(vnode, selectors[i])) {\n      selectors.pop();\n    } else if (vnode && i < n) {\n      vnode = vnode.parentNode;\n      i += 1;\n    } else if (i === n) {\n      return false;\n    }\n  }\n\n  return selectors.length === 0;\n}\n\n/**\n * @param {object} vnode - Virtual node\n * @param {string} selector - The selector to query\n*/\nfunction is(vnode, selector) {\n  const selectors = selector.split(\" \").map(a => getSelectorObject(a.trim()));\n  if (selectors.length === 1) {\n    return elementIs(vnode, selectors[0]);\n  } else {\n    return elementPathIs(vnode, selectors);\n  }\n}\n\nmodule.exports = is;\n\n//# sourceURL=webpack:///./src/class/virtual-node/is.js?");

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
eval("\n\nconst el = __webpack_require__(/*! ../create/create-element */ \"./src/create/create-element.js\");\nconst Component = __webpack_require__(/*! ../class/component */ \"./src/class/component.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst { isDomNode } = __webpack_require__(/*! ../predicates */ \"./src/predicates/index.js\");\n\nfunction getScripts(props) {\n  return props.scripts && [].concat(props.scripts).map(a => isDomNode(a) ? a : el(\"script\", { src: a }));\n}\n\nfunction Body(props) {\n  const children = [].concat(props.children);\n\n  if (props.scripts) {\n    [].concat(props.scripts).forEach(a => isDomNode(a) ? children.push(a) : children.push(el(\"script\", { src: a })));\n  }\n\n  return el(\"body\", {\n    className: props.className,\n    ref: \"slot\"\n  }, children);\n}\n\nfunction Head(props) {\n  const children = [];\n\n  children.push(el(\"meta\", { httpEquiv: \"X-UX-Compatible\", content: \"IE=edge,chrome=1\" }), el(\"meta\", { charset: \"UTF-8\" }));\n\n  if (props.supportMobile) {\n    children.push(el(\"meta\", {\n      name: \"viewport\",\n      content: [\"width=device-width\", \"initial-scale=1\", \"maximum-scale=1\", \"user-scalable=0\"].join(\", \")\n    }));\n  }\n\n  if (props.favicon) {\n    Array.prototype.push.apply(children, props.favicon);\n  }\n\n  if (props.styles) {\n    [].concat(props.styles).forEach(a => {\n      children.push(isDomNode(a) ? a : el(\"link\", {\n        rel: \"stylesheet\",\n        type: \"text/css\",\n        href: a\n      }));\n    });\n  }\n\n  if (props.meta) {\n    [].concat(props.meta).forEach(a => {\n      children.push(a);\n    });\n  }\n\n  if (props.head) {\n    Array.prototype.push.apply(children, props.head);\n  }\n\n  if (props.title) {\n    children.push(el(\"title\", [props.title]));\n  }\n\n  return el(\"head\", {\n    ref: \"head\"\n  }, children);\n}\n\nmodule.exports = class Html extends Component {\n  /**\n   * @param {object} props\n   * @param {array} props.scripts\n   * @param {array} props.styles\n   * @param {boolean} props.supportMobile\n  */\n  constructor(props) {\n    super(props);\n    this.props.favicon = [];\n    this.props.link = [];\n    this.props.isMobile = props.isMobile;\n  }\n\n  onToHtml() {\n    this.refs.slot.append(getScripts(this.props));\n    this.trigger(\"tohtml\");\n  }\n\n  title(value) {\n    if (!this.props.title) {\n      this.refs.head.append([el(\"title\", { ref: \"title\" }, [value])]);\n    } else {\n      this.refs.title.html(value);\n    }\n  }\n\n  toFile(filename) {\n    const value = this.toHtml();\n    fs.writeFileSync(filename, value);\n    return value;\n  }\n\n  render(props) {\n    return el(\"fragment\", [el(\"doctype\"), el(\"html\", {\n      onToHtml: () => this.onToHtml()\n    }, [el(Head, props), el(Body, props)])]);\n  }\n};\n\n//# sourceURL=webpack:///./src/components/html.js?");

/***/ }),

/***/ "./src/create/create-element.js":
/*!**************************************!*\
  !*** ./src/create/create-element.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst VNode = __webpack_require__(/*! ../class/virtual-node */ \"./src/class/virtual-node.js\");\nconst kebabCase = __webpack_require__(/*! ../tools/kebab-case */ \"./src/tools/kebab-case.js\");\n\nfunction filterCreatedAttributes(attr) {\n  const result = {};\n  for (var k in attr) {\n    if (k === \"class\" || k === \"className\") {\n      result.className = attr[k];\n    } else if (k === \"data\") {\n      for (var g in attr[k]) {\n        result[kebabCase(\"data-\" + g)] = attr[k][g];\n      }\n    } else if (k.indexOf(\"xlink:\") === 0) {\n      result[k] = attr[k];\n    } else {\n      result[kebabCase(k)] = attr[k];\n    }\n  }\n  return result;\n}\n\nfunction createElement() {\n  const args = [\"div\", {}, []];\n  const n = arguments.length;\n  let i = -1;\n\n  while (++i < n) {\n    if (typeof arguments[i] === \"string\" && i === 0 || typeof arguments[i] === \"function\") {\n      args[0] = arguments[i];\n    } else if (Array.isArray(arguments[i])) {\n      args[2] = args[2].concat(arguments[i]);\n    } else if (arguments[i] instanceof VNode || typeof arguments[i] === \"string\") {\n      args[2].push(arguments[i]);\n    } else if (typeof arguments[i] === \"object\" && arguments[i] != null) {\n      args[1] = arguments[i];\n    }\n  }\n\n  args[1] = filterCreatedAttributes(args[1]);\n  return new VNode(args[0], args[1], args[2]);\n}\n\nmodule.exports = createElement;\n\n//# sourceURL=webpack:///./src/create/create-element.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Component = __webpack_require__(/*! ./class/component */ \"./src/class/component.js\");\nconst el = __webpack_require__(/*! ./create/create-element */ \"./src/create/create-element.js\");\n\nel.Component = Component;\nel.Html = __webpack_require__(/*! ./components/html */ \"./src/components/html.js\");\nel.Css = __webpack_require__(/*! ./components/css */ \"./src/components/css.js\");\nel.VNode = __webpack_require__(/*! ./class/virtual-node */ \"./src/class/virtual-node.js\");\n\nmodule.exports = el;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/predicates/index.js":
/*!*********************************!*\
  !*** ./src/predicates/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  isDomNode: __webpack_require__(/*! ./is-dom-node */ \"./src/predicates/is-dom-node.js\"),\n  isObject: __webpack_require__(/*! ./is-object */ \"./src/predicates/is-object.js\"),\n  isHtmlString: __webpack_require__(/*! ./is-html-string */ \"./src/predicates/is-html-string.js\")\n};\n\n//# sourceURL=webpack:///./src/predicates/index.js?");

/***/ }),

/***/ "./src/predicates/is-dom-node.js":
/*!***************************************!*\
  !*** ./src/predicates/is-dom-node.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isDomNode(x) {\n  return !!(x && typeof x.toHtml === \"function\");\n};\n\n//# sourceURL=webpack:///./src/predicates/is-dom-node.js?");

/***/ }),

/***/ "./src/predicates/is-html-string.js":
/*!******************************************!*\
  !*** ./src/predicates/is-html-string.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isHtmlString(value) {\n  return (/<[^>]+?>/.test(value)\n  );\n};\n\n//# sourceURL=webpack:///./src/predicates/is-html-string.js?");

/***/ }),

/***/ "./src/predicates/is-object.js":
/*!*************************************!*\
  !*** ./src/predicates/is-object.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isObject(a) {\n  return Object.prototype.toString.call(a) === \"[object Object]\";\n};\n\n//# sourceURL=webpack:///./src/predicates/is-object.js?");

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