const _ = require('lodash');

module.exports = function attr(property, value) {
  if (typeof value === 'undefined') {
    return this.attributes[property];
  }

  if (['tabIndex', 'tabindex'].indexOf(property) > -1) {
    this.attributes['tabIndex'] = value;
  } else if (property.slice(0, 4) === 'data') {
    this.attributes[_.kebabCase(property)] = value;
  } else {
    this.attributes[property] = value;
  }

  return this;
};
