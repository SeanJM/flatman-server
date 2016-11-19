(function () {
  function next(self) {
    var result;
    var a = self._queue_[0];

    function future(self, f) {
      self._wait_ = true;
      f(function () {
        self._wait_ = false;
        self._queue_.shift();
        next(self);
      });
    }

    // What if the method is 'then' or 'complete' ?
    if (!self._wait_ && a) {

      result = a.instance[a.method].apply(a.instance, a.arguments);

      if (result && typeof result.then === 'function') {
        future(self, result.then);
      } else if (result && typeof result.complete === 'function') {
        future(self, result.complete);
      } else {
        self._queue_.shift();

        next(self);
      }
    }
  }

  function enqueue(self, instance, method) {
    return function () {
      var a = [];
      var i = 0;
      var n = arguments.length;

      for (; i < n; i++) a.push(arguments[i]);

      self._queue_.push({
        instance : instance,
        method : method,
        arguments : a
      });

      next(self);

      return self._mirror_;
    };
  }

  function Queue () {}

  Queue.prototype.wait = function (s) {
    setTimeout(function () {
      next(self);
    }, s);
  };

  function queue(instance) {
    var Mirror = function () {};
    var prototype = instance.constructor.prototype;

    var self = {
      _queue_ : [],
      _wait_ : false,
      _mirror_ : new Mirror(),
    };

    for (var k in instance) {
      self._mirror_[k] = instance[k];
    }

    self._mirror_.prototype = new Queue().prototype;

    Object
      .getOwnPropertyNames(prototype)
      .forEach(function (method) {
        if (typeof prototype[method] === 'function') {
          Mirror.prototype[method] = enqueue(self, instance, method);
        }
      });

    return self._mirror_;
  }

  if (module && module.exports) {
    module.exports = queue;
  } else if (window) {
    window.queue = queue;
  }
}());
