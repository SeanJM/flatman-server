module.exports = function off(event, callback) {
  if (typeof this.subscribers[event] === 'undefined') {
    this.subscribers[event] = [];
  }
  if (this.subscribers[event].includes(callback)) {
    this.subscribers[event].splice(this.subscribers[event].indexOf(callback), 1);
  }

  return this;
};
