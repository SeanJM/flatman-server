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

/***/ "./src/class/bus.js":
/*!**************************!*\
  !*** ./src/class/bus.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * @param {object} props - Bus configuration options\n * @param {object} object.target - The value of 'this' on a triggered callback\n*/\nfunction Bus(props) {\n  this.target = props.target || this;\n  this.subscribers = {};\n}\n\n/**\n * @param {string} name - The name of the event\n * @param {function} callback - The callback function\n * @return {this.target}\n*/\nBus.prototype.once = function (name, callback) {\n  const once = a => {\n    this.off(name, once);\n    callback.call(this.target, a);\n  };\n  return this.on(name, once);\n};\n\n/**\n * @param {string} name - The name of the event\n * @param {function=} callback - The callback function\n * @return {this.target}\n*/\nBus.prototype.off = function (name, callback) {\n  const nameLower = name.toLowerCase().trim();\n  const index = (this.subscribers[nameLower] || []).indexOf(callback);\n  if (index > -1) {\n    this.subscribers[nameLower].splice(index, 1);\n  } else if (typeof callback === \"undefined\") {\n    this.subscribers[nameLower] = [];\n  }\n  return this.target;\n};\n\n/**\n * @param {string} name - The name of the event\n * @param {function} callback - The callback function\n * @return {this.target}\n*/\nBus.prototype.on = function (name, callback) {\n  const nameLower = name.toLowerCase().trim();\n  if (typeof callback === \"function\") {\n    this.subscribers[nameLower] = (this.subscribers[nameLower] || []).concat(callback);\n  }\n  return this.target;\n};\n\n/**\n * @param {string} name - The name of the event\n * @param {any} value - The event value on the callback\n * @return {this.target}\n*/\nBus.prototype.trigger = function (name, value) {\n  const nameLower = name.toLowerCase().trim();\n  const list = this.subscribers[nameLower] || [];\n  for (var i = 0, n = list.length; i < n; i++) {\n    list[i].call(this.target, value);\n  }\n  return this.target;\n};\n\nmodule.exports = Bus;\n\n//# sourceURL=webpack:///./src/class/bus.js?");

/***/ }),

/***/ "./src/class/component.js":
/*!********************************!*\
  !*** ./src/class/component.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst El = __webpack_require__(/*! ./el */ \"./src/class/el.js\");\nconst Bus = __webpack_require__(/*! ./bus */ \"./src/class/bus.js\");\n\nfunction extendPrototype(method) {\n  return function () {\n    const n = arguments.length;\n    const a = new Array(n);\n    const node = this.getNode();\n    let i = -1;\n    let res;\n\n    while (++i < n) {\n      a[i] = arguments[i];\n    }\n\n    if (this.node[method]) {\n      res = this.node[method].apply(this.node, a);\n    } else {\n      res = El.prototype[method].apply(node, a);\n    }\n\n    return res === node ? this : res;\n  };\n}\n\nfunction extendElement(C) {\n  for (var k in El.prototype) {\n    if (!C.prototype[k]) {\n      C.prototype[k] = extendPrototype(k);\n    }\n  }\n  return C;\n}\n\nclass Component {\n  constructor(props = {}) {\n    this.props = props;\n    this.ref = props.ref;\n    this.refs = {};\n    this.bus = new Bus({\n      target: this\n    });\n  }\n\n  on(name, callback) {\n    this.bus.on(name, callback);\n    return this;\n  }\n\n  once(name, callback) {\n    this.bus.once(name, callback);\n    return this;\n  }\n\n  off(name, callback) {\n    this.bus.off(name, callback);\n    return this;\n  }\n\n  trigger(name, callback) {\n    this.bus.trigger(name, callback);\n    return this;\n  }\n\n  getNode() {\n    return this.node.getNode();\n  }\n\n  append(children) {\n    const childNodes = [].concat(children);\n    let i = -1;\n    const n = childNodes.length;\n    const slot = this.refs.slot || this.node;\n\n    if (this.beforeAppendChildren) {\n      this.beforeAppendChildren(children);\n    }\n\n    slot.append(children);\n    while (++i < n) {\n      for (const k in slot.refs) {\n        if (!this.refs[k]) this.refs[k] = slot.refs[k];\n      }\n    }\n\n    if (this.afterAppendChildren) {\n      this.afterAppendChildren(children);\n    }\n\n    return this;\n  }\n\n  toJSON() {\n    return {\n      tagName: this.tagName.name,\n      props: this.props,\n      node: this.node.toJSON()\n    };\n  }\n}\n\nmodule.exports = extendElement(Component);\n\n//# sourceURL=webpack:///./src/class/component.js?");

/***/ }),

/***/ "./src/class/el.js":
/*!*************************!*\
  !*** ./src/class/el.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Bus = __webpack_require__(/*! ./bus */ \"./src/class/bus.js\");\n\n/**\n * @param {string} tagName - The nodes tagName\n * @param {object} attributes - The nodes attributes\n * @param {array} childNodes - An array of children, strings or elements\n * */\nfunction El(tagName, attributes, childNodes) {\n  this.attributes = {\n    style: {},\n    className: [],\n    disabled: null,\n    name: null\n  };\n\n  this.ref = attributes.ref;\n  this.refs = {};\n  this.tagName = tagName;\n  this.node = this;\n  this.bus = new Bus({ target: this });\n  this.subscribers = { render: [] };\n  this.childNodes = [];\n\n  if (attributes.data) {\n    for (var k in attributes.data) {\n      attributes[\"data\" + k[0].toUpperCase() + k.substring(1)] = attributes.data[k];\n    }\n    delete attributes.data;\n  }\n\n  for (k in attributes) {\n    if (k.substr(0, 4) === \"once\") {\n      this.once(k.substr(4).toLowerCase(), attributes[k]);\n    } else if (k.substr(0, 2) === \"on\") {\n      this.on(k.substr(2).toLowerCase(), attributes[k]);\n    } else if (k !== \"ref\" && k !== \"data\") {\n      this.attr(k, attributes[k]);\n    }\n  }\n\n  this.append(childNodes);\n\n  for (var i = 0, n = El.__onCreate.length; i < n; i++) {\n    El.__onCreate[i].call(this);\n  }\n}\n\nEl.prototype.on = function (name, callback) {\n  this.bus.on(name, callback);\n  return this;\n};\n\nEl.prototype.once = function (name, callback) {\n  this.bus.once(name, callback);\n  return this;\n};\n\nEl.prototype.off = function (name, callback) {\n  this.bus.off(name, callback);\n  return this;\n};\n\nEl.prototype.trigger = function (name, event) {\n  this.bus.trigger(name, event);\n  return this;\n};\n\nEl.prototype.toString = function () {\n  const tagName = this.tagName[0].toUpperCase() + this.tagName.slice(1);\n  return \"[object HTML\" + tagName + \"Element]\";\n};\n\nEl.prototype.clone = __webpack_require__(/*! ./el/clone */ \"./src/class/el/clone.js\")(El);\nEl.prototype.append = __webpack_require__(/*! ./el/append */ \"./src/class/el/append.js\")(El);\nEl.prototype.html = __webpack_require__(/*! ./el/html */ \"./src/class/el/html.js\")(El);\n\nEl.prototype.addClass = __webpack_require__(/*! ./el/add-class */ \"./src/class/el/add-class.js\");\nEl.prototype.after = __webpack_require__(/*! ./el/after */ \"./src/class/el/after.js\");\nEl.prototype.appendTo = __webpack_require__(/*! ./el/append-to */ \"./src/class/el/append-to.js\");\nEl.prototype.attr = __webpack_require__(/*! ./el/attr */ \"./src/class/el/attr.js\");\nEl.prototype.before = __webpack_require__(/*! ./el/before */ \"./src/class/el/before.js\");\nEl.prototype.children = __webpack_require__(/*! ./el/children */ \"./src/class/el/children.js\");\nEl.prototype.closest = __webpack_require__(/*! ./el/closest */ \"./src/class/el/closest.js\");\nEl.prototype.contains = __webpack_require__(/*! ./el/contains */ \"./src/class/el/contains.js\");\nEl.prototype.find = __webpack_require__(/*! ./el/find */ \"./src/class/el/find.js\");\nEl.prototype.findAll = __webpack_require__(/*! ./el/find-all */ \"./src/class/el/find-all.js\");\nEl.prototype.getNode = __webpack_require__(/*! ./el/get-node */ \"./src/class/el/get-node.js\");\nEl.prototype.is = __webpack_require__(/*! ./el/is */ \"./src/class/el/is.js\");\nEl.prototype.parent = __webpack_require__(/*! ./el/parent */ \"./src/class/el/parent.js\");\nEl.prototype.parents = __webpack_require__(/*! ./el/parents */ \"./src/class/el/parents.js\");\nEl.prototype.prepend = __webpack_require__(/*! ./el/prepend */ \"./src/class/el/prepend.js\");\nEl.prototype.previous = __webpack_require__(/*! ./el/previous */ \"./src/class/el/previous.js\");\nEl.prototype.previousNodes = __webpack_require__(/*! ./el/previous-nodes */ \"./src/class/el/previous-nodes.js\");\nEl.prototype.remove = __webpack_require__(/*! ./el/remove */ \"./src/class/el/remove.js\");\nEl.prototype.removeChild = __webpack_require__(/*! ./el/remove-child */ \"./src/class/el/remove-child.js\");\nEl.prototype.removeClass = __webpack_require__(/*! ./el/remove-class */ \"./src/class/el/remove-class.js\");\nEl.prototype.replaceWith = __webpack_require__(/*! ./el/replace-with */ \"./src/class/el/replace-with.js\");\nEl.prototype.siblings = __webpack_require__(/*! ./el/siblings */ \"./src/class/el/siblings.js\");\nEl.prototype.style = __webpack_require__(/*! ./el/style */ \"./src/class/el/style.js\");\nEl.prototype.text = __webpack_require__(/*! ./el/text */ \"./src/class/el/text.js\");\nEl.prototype.toFile = __webpack_require__(/*! ./el/to-file */ \"./src/class/el/to-file.js\");\nEl.prototype.toHtml = __webpack_require__(/*! ./el/to-html */ \"./src/class/el/to-html.js\");\nEl.prototype.toJSON = __webpack_require__(/*! ./el/to-json */ \"./src/class/el/to-json.js\");\n\nEl.__onCreate = [];\nmodule.exports = El;\n\n//# sourceURL=webpack:///./src/class/el.js?");

/***/ }),

/***/ "./src/class/el/add-class.js":
/*!***********************************!*\
  !*** ./src/class/el/add-class.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function addClass(className) {\n  var classList = this.attributes.className;\n  if (classList.indexOf(className) === -1) {\n    classList.push(className);\n  }\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/add-class.js?");

/***/ }),

/***/ "./src/class/el/after.js":
/*!*******************************!*\
  !*** ./src/class/el/after.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function after(target) {\n  const targetNode = target.getNode();\n  const parentNode = targetNode.parentNode;\n  const index = parentNode && parentNode.childNodes.indexOf(targetNode);\n\n  if (typeof index === \"number\") {\n    this.parentNode = parentNode;\n    parentNode.childNodes.splice(index + 1, 0, this);\n  } else {\n    throw new Error(\"Cannot insert node after \\\"\" + targetNode.tagName + \"\\\", target does have a parent.\");\n  }\n\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/after.js?");

/***/ }),

/***/ "./src/class/el/append-to.js":
/*!***********************************!*\
  !*** ./src/class/el/append-to.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { mount } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nmodule.exports = function appendTo(parentNode) {\n  parentNode.childNodes.push(this);\n  this.parentNode = parentNode;\n  mount(this);\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/append-to.js?");

/***/ }),

/***/ "./src/class/el/append.js":
/*!********************************!*\
  !*** ./src/class/el/append.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { setRefs, mount } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nmodule.exports = function (El) {\n  return function append(maybeArrayOfChildNodes) {\n    let childNodes = [].concat(maybeArrayOfChildNodes);\n    let i = -1;\n    const n = childNodes.length;\n\n    while (++i < n) {\n      if (childNodes[i]) {\n        let node = childNodes[i].getNode ? childNodes[i].getNode() : childNodes[i];\n\n        if (node instanceof El) {\n          if (node.parentNode) {\n            node.parentNode.removeChild(node);\n          }\n          setRefs.call(this, childNodes[i]);\n          node.parentNode = this;\n        }\n\n        this.childNodes.push(node);\n        mount(node);\n      }\n    }\n\n    return this;\n  };\n};\n\n//# sourceURL=webpack:///./src/class/el/append.js?");

/***/ }),

/***/ "./src/class/el/attr.js":
/*!******************************!*\
  !*** ./src/class/el/attr.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { kebabCase } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nfunction getClassName(value) {\n  const classList = [].concat(value);\n  let className = [];\n  for (var i = 0, n = classList.length; i < n; i++) {\n    if (classList[i]) {\n      className = className.concat(classList[i].split(\" \"));\n    }\n  }\n  return className;\n}\n\nfunction setAttribute(node, property, value) {\n  if (typeof value === \"string\" && value === \"\") {\n    value = null;\n  }\n\n  if (attr.onAttr[property]) {\n    attr.onAttr[property].call(node, value);\n  } else if ([\"tabIndex\", \"tabindex\"].indexOf(property) > -1) {\n    node.attributes[\"tabIndex\"] = value;\n  } else if (property.slice(0, 4) === \"data\") {\n    node.attributes[kebabCase(property)] = value;\n  } else if (property === \"class\" || property === \"className\") {\n    node.attributes.className = getClassName(value);\n  } else if (property === \"style\") {\n    node.style(value);\n  } else {\n    node.attributes[property] = value;\n  }\n}\n\nfunction setAttrObject(node, props) {\n  for (var k in props) {\n    if (k.slice(0, 4) === \"once\") {\n      node.once(k.slice(4), props[k]);\n    } else if (k.slice(0, 2) === \"on\") {\n      node.on(k.slice(2), props[k]);\n    } else {\n      setAttribute(node, k, props[k]);\n    }\n  }\n}\n\nfunction getAttribute(node, property) {\n  if (property === \"class\") {\n    return node.attributes.className.join(\" \");\n  }\n  return node.attributes[property];\n}\n\nfunction attr(x, y) {\n  if (typeof x === \"object\") {\n    setAttrObject(this, x);\n    return this;\n  } else if (typeof x === \"string\" && typeof y !== \"undefined\") {\n    setAttribute(this, x, y);\n    return this;\n  } else if (typeof x === \"string\") {\n    return getAttribute(this, x);\n  }\n  return this.attributes;\n}\n\nattr.onAttr = {};\nmodule.exports = attr;\n\n//# sourceURL=webpack:///./src/class/el/attr.js?");

/***/ }),

/***/ "./src/class/el/before.js":
/*!********************************!*\
  !*** ./src/class/el/before.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function before(target) {\n  const targetNode = target.getNode();\n  const parentNode = targetNode.parentNode;\n  const index = parentNode && parentNode.childNodes.indexOf(targetNode);\n\n  if (typeof index === \"number\") {\n    this.parentNode = parentNode;\n    if (index > -1) {\n      parentNode.childNodes.splice(index, 0, this);\n    } else {\n      parentNode.childNodes.unshift(this);\n    }\n  } else {\n    throw new Error(\"Cannot insert node after \\\"\" + targetNode.tagName + \"\\\", target does have a parent.\");\n  }\n\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/before.js?");

/***/ }),

/***/ "./src/class/el/children.js":
/*!**********************************!*\
  !*** ./src/class/el/children.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction getChildren(node) {\n  let childNodes = [];\n\n  for (let i = 0, n = node.childNodes.length; i < n; i++) {\n    if (node.childNodes[i].tagName === \"fragment\") {\n      childNodes = childNodes.concat(getChildren(node.childNodes[i]));\n    } else {\n      childNodes.push(node.childNodes[i]);\n    }\n  }\n\n  return childNodes;\n}\n\nfunction queryChildren(a, b) {\n  let childNodes = getChildren(this);\n\n  if (typeof a === \"number\" && typeof b === \"number\") {\n    return childNodes.slice(a, a + b);\n  } else if (typeof a === \"number\") {\n    return childNodes[a];\n  }\n\n  return childNodes;\n}\n\nmodule.exports = function children(a, b) {\n  if (Array.isArray(a)) {\n    this.childNodes = a;\n    return this;\n  }\n  return queryChildren.call(this, a, b);\n};\n\n//# sourceURL=webpack:///./src/class/el/children.js?");

/***/ }),

/***/ "./src/class/el/clone.js":
/*!*******************************!*\
  !*** ./src/class/el/clone.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { merge } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nmodule.exports = function (El) {\n  return function () {\n    return new El(this.tagName, merge({}, this.attributes), this.childNodes.map(c => {\n      if (typeof c === \"string\") {\n        return c;\n      } else {\n        return c.clone();\n      }\n    }));\n  };\n};\n\n//# sourceURL=webpack:///./src/class/el/clone.js?");

/***/ }),

/***/ "./src/class/el/closest.js":
/*!*********************************!*\
  !*** ./src/class/el/closest.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function closest(selector) {\n  let p = this.parentNode;\n\n  while (p) {\n    if (p.is(selector)) {\n      return p;\n    }\n    p = p.parentNode;\n  }\n\n  return false;\n};\n\n//# sourceURL=webpack:///./src/class/el/closest.js?");

/***/ }),

/***/ "./src/class/el/contains.js":
/*!**********************************!*\
  !*** ./src/class/el/contains.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function contains(el) {\n  return !!this.find(el);\n};\n\n//# sourceURL=webpack:///./src/class/el/contains.js?");

/***/ }),

/***/ "./src/class/el/find-all.js":
/*!**********************************!*\
  !*** ./src/class/el/find-all.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction findPredicate(predicate) {\n  const found = [];\n\n  function find(node) {\n    if (predicate(node)) {\n      found.push(node);\n    }\n    for (var i = 0, n = node.childNodes.length; i < n; i++) {\n      find(node.childNodes[i]);\n    }\n  }\n\n  this.node.childNodes.forEach(find);\n  return found;\n}\n\nfunction findStringSelector(selector) {\n  const found = [];\n\n  function find(node) {\n    if (node.is && node.is(selector)) {\n      found.push(node);\n    }\n    if (node.childNodes) {\n      for (var i = 0, n = node.childNodes.length; i < n; i++) {\n        find(node.childNodes[i]);\n      }\n    }\n  }\n\n  this.node.childNodes.forEach(find);\n  return found;\n}\n\nmodule.exports = function find(selector) {\n  if (typeof selector === \"string\") {\n    return findStringSelector.call(this, selector);\n  } else if (typeof selector === \"function\") {\n    return findPredicate.call(this, selector);\n  }\n  throw new Error(\"Invalid selector for 'find'\");\n};\n\n//# sourceURL=webpack:///./src/class/el/find-all.js?");

/***/ }),

/***/ "./src/class/el/find.js":
/*!******************************!*\
  !*** ./src/class/el/find.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { isDomNode } = __webpack_require__(/*! ../../predicates */ \"./src/predicates/index.js\");\n\nfunction findPredicate(predicate) {\n  function find(node) {\n    let t;\n    if (predicate(node)) {\n      return node;\n    } else {\n      for (var i = 0, n = node.childNodes.length; i < n; i++) {\n        t = find(node.childNodes[i]);\n        if (t) {\n          return t;\n        }\n      }\n    }\n    return false;\n  }\n\n  return find(this.node);\n}\n\nfunction findStringSelector(selector) {\n  function find(node) {\n    let t;\n    if (node.is && node.is(selector)) {\n      return node;\n    } else if (node.childNodes) {\n      for (var i = 0, n = node.childNodes.length; i < n; i++) {\n        t = find(node.childNodes[i]);\n        if (t) {\n          return t;\n        }\n      }\n    }\n    return false;\n  }\n\n  return find(this.node);\n}\n\nmodule.exports = function find(selector) {\n  if (typeof selector === \"string\") {\n    return findStringSelector.call(this, selector);\n  } else if (typeof selector === \"function\") {\n    return findPredicate.call(this, selector);\n  } else if (isDomNode(selector)) {\n    return findPredicate.call(this, function (node) {\n      return node === selector;\n    });\n  }\n  throw new Error(\"Invalid selector for 'find'\");\n};\n\n//# sourceURL=webpack:///./src/class/el/find.js?");

/***/ }),

/***/ "./src/class/el/get-node.js":
/*!**********************************!*\
  !*** ./src/class/el/get-node.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function getNode() {\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/get-node.js?");

/***/ }),

/***/ "./src/class/el/html.js":
/*!******************************!*\
  !*** ./src/class/el/html.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst parseHtml = __webpack_require__(/*! flatman-parse */ \"flatman-parse\");\n\nmodule.exports = function (El) {\n  function parseEach(element) {\n    if (typeof element === \"string\") {\n      return element;\n    }\n\n    if (element.childNodes && element.childNodes.length) {\n      return new El(element.tagName, element.attributes, element.childNodes.map(parseEach));\n    }\n\n    return new El(element.tagName, element.attributes);\n  }\n\n  function parse(string) {\n    const parsed = parseHtml(string).map(parseEach);\n    return new El(\"root\", parsed);\n  }\n\n  return function html(value) {\n    if (typeof value === \"string\") {\n      const parsed = parse(value);\n      this.childNodes = parsed.childNodes;\n      return this;\n    } else {\n      return this.children().map(child => child.toHtml ? child.toHtml() : child).join(\"\\n\");\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/class/el/html.js?");

/***/ }),

/***/ "./src/class/el/is.js":
/*!****************************!*\
  !*** ./src/class/el/is.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { getSelectorObject } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nfunction isClassName(matchList) {\n  const classList = [];\n  const className = this.attributes.className;\n\n  for (var i = 0, n = className.length; i < n; i++) {\n    if (matchList.indexOf(className[i]) > -1) {\n      classList.push(className[i]);\n    }\n  }\n\n  return classList.length === matchList.length;\n}\n\nfunction elementIs(element, props) {\n  if (!element || typeof element === \"string\") {\n    return false;\n  }\n\n  if (props.tagName) {\n    if (props.tagName !== element.tagName) {\n      return false;\n    }\n  }\n\n  for (var k in props.attributes) {\n    if (k === \"class\") {\n      if (!isClassName.call(element, props.attributes[k])) {\n        return false;\n      }\n    } else if (props.attributes[k]) {\n      if (typeof props.attributes[k] === \"string\") {\n        if (props.attributes[k] !== element.attributes[k]) {\n          return false;\n        }\n      } else if (!props.attributes[k].test(element.attributes[k])) {\n        return false;\n      }\n    }\n  }\n\n  if (props.selector === \"+\") {\n    return false;\n  } else if (props.selector === \"~\") {\n    return false;\n  }\n\n  return true;\n}\n\nfunction elementPathIs(selectors) {\n  let target = this;\n  const n = selectors.length - 1;\n\n  for (var i = selectors.length - 1; i >= 0; i--) {\n    if (selectors[i].selector === \"+\") {\n      selectors.pop();\n      target = target && target.previous();\n    } else if (selectors[i].selector === \"~\") {\n      selectors.pop();\n      target = target && target.siblings().filter(x => elementIs(x, selectors[i - 1]))[0];\n    } else if (selectors[i].selector === \">\") {\n      selectors.pop();\n      target = target && target.parent();\n    } else if (elementIs(target, selectors[i])) {\n      selectors.pop();\n    } else if (target && i < n) {\n      target = target.parent();\n      i += 1;\n    } else if (i === n) {\n      return false;\n    }\n  }\n\n  return selectors.length === 0;\n}\n\nfunction isStringSelector(selector) {\n  const selectors = selector.split(\" \").map(a => getSelectorObject(a.trim()));\n  if (selectors.length === 1) {\n    return elementIs(this, selectors[0]);\n  } else {\n    return elementPathIs.call(this, selectors);\n  }\n}\n\nmodule.exports = function is(selector) {\n  if (typeof selector === \"function\") {\n    return selector(this);\n  }\n  return isStringSelector.call(this, selector);\n};\n\n//# sourceURL=webpack:///./src/class/el/is.js?");

/***/ }),

/***/ "./src/class/el/parent.js":
/*!********************************!*\
  !*** ./src/class/el/parent.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function parent() {\n  let parentNode = this.parentNode;\n\n  while (parentNode && parentNode.tagName === \"fragment\") {\n    parentNode = parentNode.parentNode;\n  }\n\n  return parentNode;\n};\n\n//# sourceURL=webpack:///./src/class/el/parent.js?");

/***/ }),

/***/ "./src/class/el/parents.js":
/*!*********************************!*\
  !*** ./src/class/el/parents.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function parents() {\n  const parents = [];\n  let parentNode = this.parentNode;\n\n  while (parentNode) {\n    parents.push(parentNode);\n    parentNode = parentNode.parent();\n    while (parentNode && parentNode.tagName === \"fragment\") {\n      parentNode = parentNode.parent();\n    }\n  }\n\n  return parents;\n};\n\n//# sourceURL=webpack:///./src/class/el/parents.js?");

/***/ }),

/***/ "./src/class/el/prepend.js":
/*!*********************************!*\
  !*** ./src/class/el/prepend.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function prepend(childNodes) {\n  childNodes = [].concat(childNodes).filter(a => a);\n\n  childNodes.forEach(child => {\n    child.parentNode = this;\n  });\n\n  [].unshift.apply(this.childNodes, childNodes);\n\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/prepend.js?");

/***/ }),

/***/ "./src/class/el/previous-nodes.js":
/*!****************************************!*\
  !*** ./src/class/el/previous-nodes.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function previousNodes() {\n  const previousNodes = [];\n  let p = this.previous();\n  while (p) {\n    previousNodes.push(p);\n    p = p.previous();\n  }\n  return previousNodes;\n};\n\n//# sourceURL=webpack:///./src/class/el/previous-nodes.js?");

/***/ }),

/***/ "./src/class/el/previous.js":
/*!**********************************!*\
  !*** ./src/class/el/previous.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function previous() {\n  let parentNode = this.parent();\n  let siblings = parentNode ? parentNode.children() : [];\n  let index = siblings.indexOf(this) - 1;\n\n  while (index > -1 && siblings[index].tagName === \"comment\") {\n    index -= 1;\n  }\n\n  return siblings[index] || null;\n};\n\n//# sourceURL=webpack:///./src/class/el/previous.js?");

/***/ }),

/***/ "./src/class/el/remove-child.js":
/*!**************************************!*\
  !*** ./src/class/el/remove-child.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { unmount } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nmodule.exports = function removeChild(element) {\n  const foundElement = this.find(element);\n  const node = foundElement && element.getNode();\n  if (node) {\n    node.parentNode.childNodes.splice(node.parentNode.childNodes.indexOf(node), 1);\n    unmount(node);\n  }\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/remove-child.js?");

/***/ }),

/***/ "./src/class/el/remove-class.js":
/*!**************************************!*\
  !*** ./src/class/el/remove-class.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function removeClass(className) {\n  var $className = this.attributes.className;\n  $className.splice($className.indexOf(className), 1);\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/remove-class.js?");

/***/ }),

/***/ "./src/class/el/remove.js":
/*!********************************!*\
  !*** ./src/class/el/remove.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function remove() {\n  this.parentNode.removeChild(this);\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/remove.js?");

/***/ }),

/***/ "./src/class/el/replace-with.js":
/*!**************************************!*\
  !*** ./src/class/el/replace-with.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { mount, unmount } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nmodule.exports = function replaceWith(domNode) {\n  var index;\n  if (this.parentNode) {\n    unmount(this);\n    index = this.parentNode.childNodes.indexOf(this);\n    this.parentNode.childNodes[index] = domNode;\n    mount(domNode);\n  } else {\n    Object.assign(this, domNode, { parentNode: this.parentNode });\n  }\n  return domNode;\n};\n\n//# sourceURL=webpack:///./src/class/el/replace-with.js?");

/***/ }),

/***/ "./src/class/el/siblings.js":
/*!**********************************!*\
  !*** ./src/class/el/siblings.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function siblings() {\n  const p = this.parent();\n  return p && p.children();\n};\n\n//# sourceURL=webpack:///./src/class/el/siblings.js?");

/***/ }),

/***/ "./src/class/el/style.js":
/*!*******************************!*\
  !*** ./src/class/el/style.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { camelCase } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nconst TO_PIXEL = [\"bottom\", \"height\", \"left\", \"marginBottom\", \"marginLeft\", \"marginRight\", \"marginTop\", \"maxHeight\", \"maxWidth\", \"minHeight\", \"minWidth\", \"paddingBottom\", \"paddingLeft\", \"paddingRight\", \"paddingTop\", \"right\", \"top\", \"width\"];\n\nfunction setStyle(property, value) {\n  if (property.indexOf(\"-\") > -1) {\n    throw \"Invalid name: \" + property + \" please use the JavaScript name for the style of \\\"\" + camelCase(property) + \"\\\"\";\n  }\n  if (TO_PIXEL.includes(property) && typeof value === \"number\") {\n    this.attributes.style[property] = value + \"px\";\n  } else {\n    this.attributes.style[property] = value;\n  }\n}\n\nmodule.exports = function style(property, value) {\n  if (typeof property === \"string\") {\n    if (typeof value !== \"undefined\") {\n      setStyle.call(this, property, value);\n      return this;\n    } else {\n      return this.attributes.style[property];\n    }\n  } else if (typeof property === \"object\") {\n    for (var name in property) {\n      setStyle.call(this, name, property[name]);\n    }\n  } else {\n    return this.attributes.style;\n  }\n\n  return this;\n};\n\n//# sourceURL=webpack:///./src/class/el/style.js?");

/***/ }),

/***/ "./src/class/el/text.js":
/*!******************************!*\
  !*** ./src/class/el/text.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction cleanText(string) {\n  var tab = string.split(\"\\n\").map(a => a.match(/^\\s+/m) ? a.match(/^\\s+/m)[0] : \"\").filter(a => a.length > 0).sort((a, b) => a.length - b.length)[0];\n\n  var exp = new RegExp(\"^\" + tab);\n\n  return string.split(\"\\n\").map(a => a.replace(exp, \"\")).join(\"\\n\");\n}\n\nmodule.exports = function text(value) {\n  var text = [];\n\n  function getText(element) {\n    if (typeof element === \"string\") {\n      text.push(cleanText(element));\n    } else {\n      element.childNodes.forEach(getText);\n    }\n  }\n\n  if (typeof value === \"string\" || typeof value === \"number\") {\n    this.childNodes = [value.toString()];\n    return this;\n  }\n\n  getText(this);\n  return text.join(\" \");\n};\n\n//# sourceURL=webpack:///./src/class/el/text.js?");

/***/ }),

/***/ "./src/class/el/to-file.js":
/*!*********************************!*\
  !*** ./src/class/el/to-file.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nmodule.exports = function toFile(filename) {\n  const value = this.toHtml();\n  fs.writeFileSync(filename, value);\n  return value;\n};\n\n//# sourceURL=webpack:///./src/class/el/to-file.js?");

/***/ }),

/***/ "./src/class/el/to-html.js":
/*!*********************************!*\
  !*** ./src/class/el/to-html.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { commentToHtml, kebabCase } = __webpack_require__(/*! ../../tools */ \"./src/tools/index.js\");\n\nconst isOpen = {\n  \"hr\": true,\n  \"img\": true,\n  \"input\": true,\n  \"link\": true,\n  \"meta\": true\n};\n\nconst isSelfClosing = {\n  \"circle\": true,\n  \"line\": true,\n  \"ellipsis\": true,\n  \"path\": true,\n  \"polygon\": true,\n  \"rect\": true\n};\n\nconst isInline = {\n  span: true,\n  b: true,\n  strong: true,\n  i: true,\n  em: true\n};\n\nconst attrList = [\"id\", \"className\", \"name\", \"title\", \"style\"];\n\nfunction sortAttributes(a, b) {\n  const aI = attrList.indexOf(a);\n  const bI = attrList.indexOf(b);\n\n  if (aI > -1 && bI > -1) {\n    return aI - bI;\n  } else if (aI > -1) {\n    return -1;\n  } else if (bI > -1) {\n    return 1;\n  }\n  return 0;\n}\n\nfunction toHtmlStyle(value) {\n  var styles = [];\n  for (var k in value) {\n    if (typeof value[k] === \"string\" || typeof value[k] === \"number\") {\n      styles.push(kebabCase(k) + \": \" + value[k]);\n    }\n  }\n  return styles.join(\";\");\n}\n\nfunction toHtmlAttribute(name, value) {\n  value = typeof value === \"number\" ? value.toString() : value;\n\n  if (typeof value === \"string\") {\n    value = value.trim();\n  }\n\n  if (name === \"style\") {\n    if (typeof value === \"object\" && Object.keys(value).length) {\n      return `${name}=\"${toHtmlStyle(value)}\"`;\n    }\n    return \"\";\n  } else if (name === \"className\") {\n    if (value.length) {\n      value = value.sort().join(\" \");\n      return `class=\"${value}\"`;\n    }\n    return \"\";\n  } else if (name === \"tabindex\") {\n    return `tabIndex=\"${value}\"`;\n  } else if (name.substr(0, 4) === \"data\") {\n    return `${kebabCase(name)}=\"${value}\"`;\n  } else if (name === \"viewBox\") {\n    return `viewBox=\"${value}\"`;\n  } else if (name.indexOf(\":\") !== -1) {\n    return `${name}=\"${value}\"`;\n  }\n  if (value && value.length) {\n    return `${kebabCase(name)}=\"${value}\"`;\n  }\n  return \"\";\n}\n\nfunction getAttr(node) {\n  const attributes = node.attributes;\n  const list = attributes ? Object.keys(attributes).sort(sortAttributes) : [];\n  let a = [];\n\n  list.forEach(function (attribute) {\n    if (typeof attributes[attribute] !== \"undefined\") {\n      a.push(toHtmlAttribute(attribute, attributes[attribute]));\n    }\n  });\n\n  a = a.filter(a => a.length);\n\n  if (a.length) {\n    return \" \" + a.join(\" \");\n  }\n\n  return \"\";\n}\n\nfunction isTextNode(node) {\n  return typeof node === \"number\" || typeof node === \"string\";\n}\n\nfunction fragmentToHtml(element, depth) {\n  let childNodes = element.childNodes;\n  const tab = new Array(depth + 1).join(\"  \");\n  const parentIsBlock = element.parentNode && !isInline[element.parentNode.tagName];\n  const hasText = childNodes.filter(isTextNode).length;\n  const length = childNodes.length;\n  return childNodes.map(function (node, i) {\n    if (node.toHtml) {\n      return node.toHtml(hasText ? 0 : depth);\n    }\n    return (i === 0 ? tab : \"\") + node + (parentIsBlock && length === 1 || length - 1 === i ? \"\\n\" : \"\");\n  }).join(\"\");\n}\n\nmodule.exports = function toHtml($depth) {\n  const depth = $depth || 0;\n  const tab = new Array(depth + 1).join(\"  \");\n  const tabN = new Array(depth + 2).join(\"  \");\n  const s = [];\n  const parentIsBlock = this.parentNode && !isInline[this.parentNode.tagName];\n  const siblings = this.siblings();\n  const hasTextSibling = siblings && siblings.filter(isTextNode).length > 0;\n  const isFirst = siblings ? siblings.indexOf(this) === 0 : true;\n  const isLast = siblings ? siblings.indexOf(this) === siblings.length - 1 : true;\n  let childNodes = this.childNodes;\n\n  this.trigger(\"tohtml\");\n  if (parentIsBlock && (hasTextSibling && isFirst || !hasTextSibling)) {\n    s.push(tab);\n  }\n\n  if (this.tagName === \"xml\") {\n    s.push(\"<?\", this.tagName, getAttr(this));\n  } else {\n    s.push(\"<\", this.tagName, getAttr(this));\n  }\n\n  if (this.tagName === \"comment\") {\n    return commentToHtml(this, depth);\n  } else if (this.tagName === \"fragment\") {\n    return fragmentToHtml(this, depth);\n  } else if (isSelfClosing[this.tagName]) {\n    s.push(\"/>\");\n  } else if (isOpen[this.tagName]) {\n    s.push(\">\");\n  } else if (this.tagName === \"xml\") {\n    s.push(\"?>\");\n  } else {\n    s.push(\">\");\n    if (childNodes.length === 1 && isTextNode(childNodes[0])) {\n      childNodes = childNodes[0].toString().split(\"\\n\");\n      s.push(childNodes.length > 1 ? \"\\n\" + childNodes.map(a => tabN + a + \"\\n\").join(\"\") + tab : childNodes[0]);\n    } else if (childNodes.length) {\n      if (!isInline[this.tagName]) {\n        s.push(\"\\n\");\n      }\n\n      childNodes.forEach((node, i) => {\n        if (node.toHtml) {\n          s.push(node.toHtml(depth + 1));\n        } else {\n          if (i === 0) {\n            s.push(tabN, node);\n          } else if (!isInline[this.tagName] && i === childNodes.length - 1) {\n            s.push(node, \"\\n\");\n          } else {\n            s.push(node);\n          }\n        }\n      });\n\n      if (!isInline[this.tagName]) {\n        s.push(tab);\n      }\n    }\n    s.push(\"</\" + this.tagName + \">\");\n  }\n\n  return s.join(\"\") + (parentIsBlock && (!hasTextSibling || isLast) ? \"\\n\" : \"\");\n};\n\n//# sourceURL=webpack:///./src/class/el/to-html.js?");

/***/ }),

/***/ "./src/class/el/to-json.js":
/*!*********************************!*\
  !*** ./src/class/el/to-json.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function toJSON() {\n  return {\n    tagName: this.tagName,\n    attributes: this.attributes,\n    childNodes: this.childNodes\n  };\n};\n\n//# sourceURL=webpack:///./src/class/el/to-json.js?");

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
eval("\n\nconst el = __webpack_require__(/*! ../create/create-element */ \"./src/create/create-element.js\");\nconst Component = __webpack_require__(/*! ../class/component */ \"./src/class/component.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst { isDomNode } = __webpack_require__(/*! ../predicates */ \"./src/predicates/index.js\");\n\nfunction getScripts(props) {\n  return props.scripts && [].concat(props.scripts).map(a => isDomNode(a) ? a : el(\"script\", { src: a }));\n}\n\nfunction Head(props) {\n  const children = [];\n\n  children.push(el(\"meta\", { httpEquiv: \"X-UX-Compatible\", content: \"IE=edge,chrome=1\" }), el(\"meta\", { charset: \"UTF-8\" }));\n\n  if (props.supportMobile) {\n    children.push(el(\"meta\", {\n      name: \"viewport\",\n      content: [\"width=device-width\", \"initial-scale=1\", \"maximum-scale=1\", \"user-scalable=0\"].join(\", \")\n    }));\n  }\n\n  if (props.favicon) {\n    Array.prototype.push.apply(children, props.favicon);\n  }\n\n  if (props.styles) {\n    [].concat(props.styles).forEach(a => {\n      children.push(isDomNode(a) ? a : el(\"link\", {\n        rel: \"stylesheet\",\n        type: \"text/css\",\n        href: a\n      }));\n    });\n  }\n\n  if (props.meta) {\n    [].concat(props.meta).forEach(a => {\n      children.push(a);\n    });\n  }\n\n  if (props.head) {\n    Array.prototype.push.apply(children, props.head);\n  }\n\n  if (props.title) {\n    children.push(el(\"title\", [props.title]));\n  }\n\n  return el(\"head\", {\n    ref: \"head\"\n  }, children);\n}\n\nmodule.exports = class Html extends Component {\n  /**\n   * @param {object} props\n   * @param {array} props.scripts\n   * @param {array} props.styles\n   * @param {boolean} props.supportMobile\n  */\n  constructor(props) {\n    super(props);\n    this.props.favicon = [];\n    this.props.link = [];\n    this.props.isMobile = props.isMobile;\n    this.on(\"tohtml\", props.onToHtml);\n  }\n\n  onToHtml() {\n    this.refs.slot.append(getScripts(this.props));\n    this.trigger(\"tohtml\");\n  }\n\n  getRefs(child) {\n    if (child.ref && !this.refs[child.ref]) {\n      this.refs[child.ref] = child;\n    }\n  }\n\n  toHtml() {\n    return \"<!DOCTYPE HTML>\\n\" + this.node.toHtml();\n  }\n\n  title(value) {\n    if (!this.props.title) {\n      this.refs.head.append([el(\"title\", { ref: \"title\" }, [value])]);\n    } else {\n      this.refs.title.html(value);\n    }\n  }\n\n  toFile(filename) {\n    const value = this.toHtml();\n    fs.writeFileSync(filename, value);\n    return value;\n  }\n\n  render(props) {\n    return el(\"html\", {\n      onToHtml: () => this.onToHtml()\n    }, [el(Head, props), el(\"body\", {\n      className: props.className,\n      ref: \"slot\"\n    })]);\n  }\n};\n\n//# sourceURL=webpack:///./src/components/html.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  Css: __webpack_require__(/*! ./css */ \"./src/components/css.js\"),\n  Html: __webpack_require__(/*! ./html */ \"./src/components/html.js\")\n};\n\n//# sourceURL=webpack:///./src/components/index.js?");

/***/ }),

/***/ "./src/constants/mounted.js":
/*!**********************************!*\
  !*** ./src/constants/mounted.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  MOUNTED: []\n};\n\n//# sourceURL=webpack:///./src/constants/mounted.js?");

/***/ }),

/***/ "./src/create/create-component.js":
/*!****************************************!*\
  !*** ./src/create/create-component.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function createComponent(maybeConstructor, props, children) {\n  const isConstructor = !!maybeConstructor.prototype.toHtml;\n\n  const component = isConstructor ? new maybeConstructor(props) : maybeConstructor(props);\n\n  if (component) {\n    if (isConstructor) {\n      component.tagName = maybeConstructor;\n\n      if (maybeConstructor.prototype.render) {\n        component.node = maybeConstructor.prototype.render.call(component, props);\n\n        if (typeof component.node === \"undefined\") {\n          throw new Error(\"Component does not return a valid element.\");\n        }\n\n        component.ref = component.ref ? component.ref : component.node && component.node.ref;\n      }\n    }\n\n    if (component.node) {\n      component.getNode().on(\"mount\", function () {\n        component.onMount && component.onMount({\n          target: component.getNode()\n        });\n      });\n\n      component.getNode().on(\"unmount\", function () {\n        component.onUnmount && component.onUnmount({\n          target: component.getNode()\n        });\n      });\n\n      for (var k in component.node.refs) {\n        if (!component.refs[k]) component.refs[k] = component.node.refs[k];\n      }\n\n      if (component.node.refs.slot) {\n        for (const k in component.node.refs.slot.refs) {\n          if (component.refs[k]) component.refs[k] = component.node.refs.slot.refs[k];\n        }\n      }\n\n      component.append(children);\n    }\n\n    return component;\n  } else {\n    throw new Error(\"Invalid component, a component cannot return nothing.\");\n  }\n};\n\n//# sourceURL=webpack:///./src/create/create-component.js?");

/***/ }),

/***/ "./src/create/create-element.js":
/*!**************************************!*\
  !*** ./src/create/create-element.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst El = __webpack_require__(/*! ../class/el */ \"./src/class/el.js\");\nconst Component = __webpack_require__(/*! ../class/component */ \"./src/class/component.js\");\nconst { isDomNode } = __webpack_require__(/*! ../predicates */ \"./src/predicates/index.js\");\n\nconst createComponent = __webpack_require__(/*! ./create-component */ \"./src/create/create-component.js\");\n\nfunction createElement() {\n  const args = [\"div\", {}, []];\n  const n = arguments.length;\n  let i = -1;\n\n  while (++i < n) {\n    if (typeof arguments[i] === \"string\" && i === 0 || typeof arguments[i] === \"function\") {\n      args[0] = arguments[i];\n    } else if (Array.isArray(arguments[i])) {\n      args[2] = args[2].concat(arguments[i]);\n    } else if (isDomNode(arguments[i]) || typeof arguments[i] === \"string\") {\n      args[2].push(arguments[i]);\n    } else if (typeof arguments[i] === \"object\" && arguments[i] != null) {\n      args[1] = arguments[i];\n    }\n  }\n\n  return typeof args[0] === \"function\" ? createComponent(args[0], args[1], args[2]) : new El(args[0], args[1], args[2]);\n}\n\ncreateElement.onAttr = function (name, callback) {\n  El.prototype.attr.onAttr[name.toLowerCase()] = callback;\n  return createElement;\n};\n\ncreateElement.fn = function (name, callback) {\n  El.prototype[name] = callback;\n  Component.prototype[name] = Component.__extend(name);\n};\n\ncreateElement.create = Component.create;\nmodule.exports = createElement;\n\n//# sourceURL=webpack:///./src/create/create-element.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Component = __webpack_require__(/*! ./class/component */ \"./src/class/component.js\");\nconst el = __webpack_require__(/*! ./create/create-element */ \"./src/create/create-element.js\");\n\nel.Component = Component;\nel.Html = __webpack_require__(/*! ./components/html */ \"./src/components/html.js\");\nel.Css = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n\nmodule.exports = el;\n\n//# sourceURL=webpack:///./src/index.js?");

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
eval("\n\nmodule.exports = function getSelectorObject(selector) {\n  let classes = selector.match(/\\.[a-zA-Z0-9\\-\\_]+/g);\n  let id = selector.match(/\\#[a-zA-Z0-9\\-\\_]+/);\n  let attr = selector.match(/\\[[^\\]]+?\\]/g);\n  let tagName = selector.match(/^[a-zA-Z0-9\\-\\_]+/);\n\n  let selectorObject = {\n    selector: selector,\n    tagName: tagName ? tagName[0] : false,\n    attributes: {}\n  };\n\n  if (classes) {\n    selectorObject.attributes.class = classes.map(a => a.slice(1));\n  }\n\n  if (id) {\n    selectorObject.attributes.id = id[0].slice(1);\n  }\n\n  if (attr) {\n    attr.forEach(function (string) {\n      let value = string.match(/\\[([a-zA-Z0-9\\-\\_]+)(?:(\\*|\\^|\\$|)=([^\\]]+?)\\]|)/);\n      value[1] = value[1] === \"class\" ? \"className\" : value[1];\n      value[3] = value[3] ? value[3].slice(1, -1) : false;\n\n      if (value[2]) {\n        if (value[2] === \"*\") {\n          selectorObject.attributes[value[1]] = new RegExp(value[3]);\n        } else if (value[2] === \"^\") {\n          selectorObject.attributes[value[1]] = new RegExp(\"^\" + value[3]);\n        } else if (value[2] === \"$\") {\n          selectorObject.attributes[value[1]] = new RegExp(value[3] + \"$\");\n        }\n      } else if (value[3]) {\n        selectorObject.attributes[value[1]] = new RegExp(\"^\" + value[3] + \"$\");\n      } else {\n        selectorObject.attributes[value[1]] = new RegExp(\".+\");\n      }\n    });\n  }\n\n  return selectorObject;\n};\n\n//# sourceURL=webpack:///./src/tools/get-selector-object.js?");

/***/ }),

/***/ "./src/tools/get.js":
/*!**************************!*\
  !*** ./src/tools/get.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function get(obj, path) {\n  let t = obj;\n  let p = [].concat(path).join(\".\").split(\".\");\n\n  for (var i = 0, n = p.length; i < n; i++) {\n    if (typeof t[p[i]] === \"undefined\") {\n      return t[p[i]];\n    }\n    t = t[p[i]];\n  }\n\n  return t;\n};\n\n//# sourceURL=webpack:///./src/tools/get.js?");

/***/ }),

/***/ "./src/tools/index.js":
/*!****************************!*\
  !*** ./src/tools/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  commentToHtml: __webpack_require__(/*! ./comment-to-html */ \"./src/tools/comment-to-html.js\"),\n\n  set: __webpack_require__(/*! ./set */ \"./src/tools/set.js\"),\n  get: __webpack_require__(/*! ./get */ \"./src/tools/get.js\"),\n\n  getSelectorGroup: __webpack_require__(/*! ./get-selector-group */ \"./src/tools/get-selector-group.js\"),\n  getSelectorObject: __webpack_require__(/*! ./get-selector-object */ \"./src/tools/get-selector-object.js\"),\n\n  kebabCase: __webpack_require__(/*! ./kebab-case */ \"./src/tools/kebab-case.js\"),\n  camelCase: __webpack_require__(/*! ./camel-case */ \"./src/tools/camel-case.js\"),\n\n  merge: __webpack_require__(/*! ./merge */ \"./src/tools/merge.js\"),\n  mount: __webpack_require__(/*! ./mount */ \"./src/tools/mount.js\"),\n  unmount: __webpack_require__(/*! ./unmount */ \"./src/tools/unmount.js\"),\n\n  setRefs: __webpack_require__(/*! ./set-refs */ \"./src/tools/set-refs.js\")\n};\n\n//# sourceURL=webpack:///./src/tools/index.js?");

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

/***/ "./src/tools/merge.js":
/*!****************************!*\
  !*** ./src/tools/merge.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction merge(a) {\n  let i = 0;\n  const n = arguments.length;\n  if (a == null) {\n    a = {};\n  }\n  while (++i < n) {\n    if (arguments[i]) {\n      mergeRightToLeft(a, arguments[i]);\n    }\n  }\n  return a;\n}\n\nfunction mergeArray(left, right) {\n  let i = -1;\n  const n = right.length;\n  while (++i < n) {\n    if (left.indexOf(right[i]) === -1) {\n      if (Array.isArray(right[i])) {\n        left.push(mergeRightToLeft([], right[i]));\n      } else if (typeof right[i] === \"object\") {\n        left.push(mergeRightToLeft({}, right[i]));\n      } else {\n        left.push(right[i]);\n      }\n    }\n  }\n  return left;\n}\n\nfunction mergeRightToLeftObject(left, right) {\n  for (var k in right) {\n    if (right.hasOwnProperty(k)) {\n      if (Array.isArray(right[k])) {\n        left[k] = merge([], left[k], right[k]);\n      } else if (typeof right[k] === \"object\") {\n        left[k] = merge({}, left[k], right[k]);\n      } else {\n        left[k] = right[k];\n      }\n    }\n  }\n  return left;\n}\n\nfunction mergeRightToLeft(left, right) {\n  if (Array.isArray(left) && Array.isArray(right)) {\n    return mergeArray(left, right);\n  } else if (typeof left === \"object\" && typeof right === \"object\") {\n    return mergeRightToLeftObject(left, right);\n  }\n  return right;\n}\n\nmodule.exports = merge;\n\n//# sourceURL=webpack:///./src/tools/merge.js?");

/***/ }),

/***/ "./src/tools/mount.js":
/*!****************************!*\
  !*** ./src/tools/mount.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { MOUNTED } = __webpack_require__(/*! ../constants/mounted */ \"./src/constants/mounted.js\");\n\nmodule.exports = function mount(node, shouldMount) {\n  const children = node.childNodes;\n  let p = node.parentNode;\n\n  if (typeof shouldMount === \"undefined\") {\n    while (p && p.parentNode) {\n      p = p.parentNode;\n    }\n    shouldMount = p && p.tagName === \"html\";\n  }\n\n  if (children && shouldMount && MOUNTED.indexOf(node) === -1) {\n    MOUNTED.push(node);\n    node.trigger(\"mount\");\n    for (var i = 0, n = children.length; i < n; i++) {\n      mount(children[i], shouldMount);\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/tools/mount.js?");

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

/***/ "./src/tools/set.js":
/*!**************************!*\
  !*** ./src/tools/set.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function set(obj, path, value) {\n  let t = obj;\n  let p = [].concat(path).join(\".\").split(\".\");\n  let l = p.slice(-1)[0];\n\n  for (var i = 0, n = p.length - 1; i < n; i++) {\n    if (typeof t[p[i]] === \"undefined\") {\n      t[p[i]] = {};\n    }\n    t = t[p[i]];\n  }\n\n  t[l] = value;\n  return value;\n};\n\n//# sourceURL=webpack:///./src/tools/set.js?");

/***/ }),

/***/ "./src/tools/unmount.js":
/*!******************************!*\
  !*** ./src/tools/unmount.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst { MOUNTED } = __webpack_require__(/*! ../constants/mounted */ \"./src/constants/mounted.js\");\n\nmodule.exports = function unmount(node) {\n  const children = node.childNodes;\n  const indexOf = MOUNTED.indexOf(node);\n\n  if (children && indexOf !== -1) {\n    MOUNTED.splice(indexOf, 1);\n\n    node.trigger(\"unmount\");\n\n    for (var i = 0, n = children.length; i < n; i++) {\n      unmount(children[i]);\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/tools/unmount.js?");

/***/ }),

/***/ "flatman-parse":
/*!********************************!*\
  !*** external "flatman-parse" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"flatman-parse\");\n\n//# sourceURL=webpack:///external_%22flatman-parse%22?");

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