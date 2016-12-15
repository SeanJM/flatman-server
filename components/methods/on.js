module.exports = function on(event, callback) {
  if (typeof this.subscribers[event] === 'undefined') {
    this.subscribers[event] = [];
  }
  if (!this.subscribers[event].includes(callback)) {
    this.subscribers[event].push(callback);
  }

  return this;
};
