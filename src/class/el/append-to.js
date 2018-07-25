const { mount } = require("../../tools");

module.exports = function appendTo(parentNode) {
  parentNode.childNodes.push(this);
  this.parentNode = parentNode;
  mount(this);
  return this;
};
