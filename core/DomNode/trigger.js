module.exports = function trigger(event, opt) {
  var self = this;
  if (Array.isArray(this.subscribers[event])) {
    this.subscribers[event].forEach(function (callback) {
      callback.call(self, opt);
    });
  }

  return this;
};
