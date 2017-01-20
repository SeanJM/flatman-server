const isDomNode = require('../predicates/isDomNode');
const isComponent = require('../predicates/isComponent');
const Component = require('flatman-component');

function getNames(component, node) {
  if (node.childNodes) {
    node.childNodes.forEach(function (child) {
      var name = isDomNode(child)
        ? child.name()
        : child.dict && child.dict.name;

      if (name) {
        component.node[name] = child;
      }

      getNames(component, child);
    });
  }
}

module.exports = function createComponent(tagName, opt, children) {
  let Constructor = Component.lib[tagName] || tagName;
  let component = new Constructor(opt);
  let name = Constructor.name || 'Anonymous Component';
  let childNodes = [];
  let text = [];

  component.dict = component.dict || {};
  component.childNodes = component.childNodes || [];
  component.subscribers = component.subscribers || {};
  component.node = component.node || {};

  component.tagName = typeof tagName === 'string'
    ? tagName
    : undefined;

  if (typeof component.render === 'function') {

    component.node.document = component.render(opt);

    if (component.node.document) {
      getNames(component, component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }

    Object.assign(component.dict, opt);
    component.attributes = component.node.document.attributes;
  } else {
    // Assign to value of 'this' first
    for (var k in opt) {
      if (typeof component[k] === 'undefined') {
        component[k] = opt[k];
      } else if (k === 'dict') {
        Object.assign(component[k], opt[k]);
      }
    }

    for (var k in opt) {
      if (k === 'className') {
        component.addClass(opt[k]);
      } else if (k === 'id') {
        component.attr('id', opt[k]);
      } else if (typeof component[k] === 'function') {
        component[k](opt[k]);
      }
    }
  }

  children.forEach(function (a) {
    if (typeof a === 'string' || typeof a === 'number') {
      text.push(a);
    } else {
      childNodes.push(a);
    }
  });

  if (childNodes.length) {
    if (typeof component.append === 'function') {
      component.append(childNodes);
    } else {
      component.node.document.append(childNodes);
    }
  }

  if (text.length) {
    if (typeof component.text === 'function') {
      component.text.apply(component, text);
    } else {
      throw new Error('invalid component \'' + name + '\', the constructor must have a \'text\' method.');
    }
  }

  return component;
};
