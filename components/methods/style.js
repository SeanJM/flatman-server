const _ = require('lodash');

const TO_PIXEL = [
  'bottom',
  'height',
  'left',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'right',
  'top',
  'width',
];

function setStyle(property, value) {
  var name = _.kebabCase(property);
  if (TO_PIXEL.includes(name) && typeof value === 'number') {
    this.attributes.style[name] = value + 'px';
  } else {
    this.attributes.style[name] = value;
  }
}

module.exports = function style(property, value) {
  if (typeof property === 'string' && typeof value !== 'undefined') {
    setStyle.call(this, property, value);
  } else if (typeof property === 'object') {
    for (var name in property) {
      setStyle.call(this, name, property[name]);
    }
  } else {
    throw new Error('Invalid values for "style"');
  }

  return this;
};
