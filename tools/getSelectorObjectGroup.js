const getSelectorGroup = require('./getSelectorGroup');
const getSelectorObject = require('./getSelectorObject');

module.exports = function getSelectorObjectGroup(selector) {
  return getSelectorGroup(selector).map(getSelectorObject);
};
