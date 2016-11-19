const _ = require('lodash');

const ATTR_VALUE_TO_STRING = [ 'tabindex', 'tabIndex' ];

const ATTR_NAME = {
  'tabIndex' : 'tabindex'
};

function formatAttrName(key) {
  return typeof ATTR_NAME[key] === 'string'
    ? ATTR_NAME[key]
    : key;
}

function toValue(key, value) {
  return (
    ATTR_VALUE_TO_STRING.includes(key)
    && typeof key === 'number'
  ) ? value.toString()
    : value;
}

module.exports = function formatAttributes(attributes) {
  var formatted = {};

  _.forEach(attributes, function (value, key) {
    if (key.substr(0, 4) === 'data') {
      formatted['data-' + _.kebabCase(key.substr(4))] = value;
    } else if (key === 'style' && typeof value === 'object') {
      formatted[key] = [];
      _.forEach(value, function (value, property) {
        formatted[key].push(property + ':' + value);
      });
      formatted[key] = formatted[key].join(';');
    } else {
      formatted[formatAttrName(key)] = toValue(key, value);
    }
  });


  return formatted;
};
