const _ = require('lodash');

function attrObject(props) {
  for (k in props) {
    if (k.slice(0, 4) === 'once') {
      this.once(k.slice(4), props[k]);
    } else if (k.slice(0, 2) === 'on') {
      this.on(k.slice(2), props[k]);
    } else if (k === 'className') {
      this.attr('className', props[k]);
    } else if (k === 'id') {
      this.attr('id', props[k]);
    }
  }
}

function getClassName(value) {
  var array = Array.isArray(value) ? value : value.split(' ');
  var result = [];
  var temp;
  for (var i = 0, n = array.length; i < n; i++) {
    temp = array[i] && array[i].trim();
    if (temp) { result.push(temp); }
  }
  return result;
}

function attrString(property, value) {
  if (typeof value === 'string' && value === '') {
    value = null;
  }

  if (typeof value === 'undefined') {
    if (property === 'class' || property === 'className') {
      return this.attributes.className.join(' ');
    }
    return this.attributes[property];
  }

  if (['tabIndex', 'tabindex'].indexOf(property) > -1) {
    this.attributes['tabIndex'] = value;
  } else if (property.slice(0, 4) === 'data') {
    this.attributes[_.kebabCase(property)] = value;
  } else if (property === 'className' || property === 'class') {
    this.attributes.className = getClassName(value);
  } else if (property === 'style') {
    if (typeof value === 'string') {
      throw new Error('Invalid value of "' + value.substr(0, 30) + '", style must be passed an object as an argument and not a string.');
    }
    this.style(value);
  } else {
    this.attributes[property] = value;
  }
}

module.exports = function attr(property, value) {
  if (typeof property === 'object') {
    attrObject.call(this, property);
    return this;
  }
  return attrString.call(this, property, value);
};
