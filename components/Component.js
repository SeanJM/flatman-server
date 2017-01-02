const predicates = require('../predicates/');
const isComponent = predicates.isComponent;

class Component {
  constructor(Constructor, opts, arr) {
    let instance = new Constructor(opts);
    let name = Constructor.name || 'Anonymous Component';
    let childNodes = [];
    let text = [];

    if (!isComponent(instance)) {
      throw new Error('invalid component: \"' + name + '\", the constructor must have property called \'node\' which contains a root named \'document\'');
    }

    // Assign to value of 'this' first
    for (var k in opts) {
      if (typeof instance[k] === 'undefined') {
        instance[k] = opts[k];
      } else if (k === 'dict') {
        Object.assign(instance[k], opts[k]);
      }
    }

    for (var k in opts) {
      if (
        k === 'className'
        && typeof instance.addClass === 'function'
      ) {
        instance.addClass(opts[k]);
      } else if (
        k === 'id'
        && typeof instance.attr === 'function'
      ) {
        instance.attr('id', opts[k]);
      } else if (typeof instance[k] === 'function') {
        instance[k](opts[k]);
      }
    }

    arr.forEach(function (a) {
      if (typeof a === 'string' || typeof a === 'number') {
        text.push(a);
      } else {
        childNodes.push(a);
      }
    });

    if (childNodes.length) {
      if (typeof instance.append === 'function') {
        instance.append(childNodes);
      } else {
        throw new Error('invalid component \'' + name + '\', the constructor must have an \'append\' method.');
      }
    }

    if (text.length) {
      if (typeof instance.text === 'function') {
        instance.text.apply(instance, text);
      } else {
        throw new Error('invalid component \'' + name + '\', the constructor must have a \'text\' method.');
      }
    }

    return instance;
  }

  name(value) {
    if (typeof value !== 'undefined') {
      this.attributes.name = value;
    } else {
      return this.attributes.name;
    }
  }
}

module.exports = Component;
