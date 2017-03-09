const isDomNode = require('../predicates/isDomNode');
const isComponent = require('../predicates/isComponent');
const Component = require('flatman-component');

function getComponentNames(component, node) {
  if (node.children) {
    node.children().forEach(function (child) {
      var name = child.name && child.name();
      if (name && !component.node[name]) {
        component.node[name] = child.component || child;
      }
      getComponentNames(component, child);
    });
  }
}

module.exports = function createComponent(tagName, props, array) {
  let constructor = Component.lib[tagName];
  let component = new constructor(props);
  let childNodes = [];
  let strings = [];

  component.tagName = tagName;
  component.props = component.props || {};
  component.subscribers = component.subscribers || {};
  component.node = component.node || {};


  if (constructor.prototype.text) {
    for (var i = 0, n = array.length; i < n; i++) {
      if (typeof array[i] === 'string' || typeof array[i] === 'number') {
        strings.push(array[i]);
      } else {
        childNodes.push(array[i]);
      }
    }
  } else {
    childNodes = array;
  }

  for (var prop in props) {
    component.props[prop] = props[prop];
  }

  if (typeof component.render === 'function') {
    component.node.document = component.render(props);
    if (component.node.document) {
      component.node.document.component = component;
      getComponentNames(component, component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }
  }

  if (childNodes.length) {
    component.append(childNodes);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
};
