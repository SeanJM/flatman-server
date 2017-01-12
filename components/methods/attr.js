const _ = require('lodash');

module.exports = function attr(property, value) {
  if (typeof value === 'string' && value === '') {
    value = null;
  }

  if (typeof value === 'undefined') {
    if (property === 'class') {
      return this.attributes.className;
    }
    return this.attributes[property];
  }

  if (['tabIndex', 'tabindex'].indexOf(property) > -1) {
    this.attributes['tabIndex'] = value;
  } else if (property.slice(0, 4) === 'data') {
    this.attributes[_.kebabCase(property)] = value;
  } else if (property === 'class') {
    this.attributes.className = value;
  } else if (property === 'style') {
    if (typeof value === 'string') {
      throw new Error('Invalid value of "' + value.substr(0, 30) + '", style must be passed an object as an argument and not a string.');
    }
    this.style(value);
  } else {
    this.attributes[property] = value;
  }

  return this;
};
