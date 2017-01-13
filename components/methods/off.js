module.exports = function off(event, callback) {
  if (typeof this.subscribers[event] === 'undefined') {
    this.subscribers[event] = [];
  }

  if (callback) {
    this.subscribers[event] = this.subscribers[event].filter(a => a !== callback);
  } else {
    this.subscribers[event] = [];
  }

  return this;
};
