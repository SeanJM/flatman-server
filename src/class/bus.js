/**
 * @param {object} props - Bus configuration options
 * @param {object} object.target - The value of 'this' on a triggered callback
*/
function Bus(props) {
  this.target = props.target || this;
  this.subscribers = {};
}

/**
 * @param {string} name - The name of the event
 * @param {function} callback - The callback function
 * @return {this.target}
*/
Bus.prototype.once = function (name, callback) {
  const once = a => {
    this.off(name, once);
    callback.call(this.target, a);
  };
  return this.on(name, once);
};

/**
 * @param {string} name - The name of the event
 * @param {function=} callback - The callback function
 * @return {this.target}
*/
Bus.prototype.off = function (name, callback) {
  const nameLower = name.toLowerCase().trim();
  const index = (this.subscribers[nameLower] || []).indexOf(callback);
  if (index > -1) {
    this.subscribers[nameLower].splice(index, 1);
  } else if (typeof callback === "undefined") {
    this.subscribers[nameLower] = [];
  }
  return this.target;
};

/**
 * @param {string} name - The name of the event
 * @param {function} callback - The callback function
 * @return {this.target}
*/
Bus.prototype.on = function (name, callback) {
  const nameLower = name.toLowerCase().trim();
  if (typeof callback === "function") {
    this.subscribers[nameLower] = (this.subscribers[nameLower] || []).concat(callback);
  }
  return this.target;
};

/**
 * @param {string} name - The name of the event
 * @param {any} value - The event value on the callback
 * @return {this.target}
*/
Bus.prototype.trigger = function (name, value) {
  const nameLower = name.toLowerCase().trim();
  const list = (this.subscribers[nameLower] || []);
  for (var i = 0, n = list.length; i < n; i++) {
    list[i].call(this.target, value);
  }
  return this.target;
};

module.exports = Bus;