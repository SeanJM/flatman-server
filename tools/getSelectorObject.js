module.exports = function getSelectorObject(selector) {
  let classes = selector.match(/\.[a-zA-Z0-9\-\_]+/g);
  let id = selector.match(/\#[a-zA-Z0-9\-\_]+/);
  let attr = selector.match(/\[[^\]]+?\]/g);
  let tagName = selector.match(/^[a-zA-Z0-9\-\_]+/);

  let self = {
    tagName : tagName ? tagName[0] : false,
    attributes : {}
  };

  if (classes) {
    self.attributes.className = classes.map(a => a.slice(1));
  }

  if (id) {
    self.attributes.id = id[0].slice(1);
  }

  if (attr) {
    attr.forEach(function (string) {
      let value = string.match(/\[([a-zA-Z0-9\-\_]+)(\*|\^|\$|)=([^\]]+?)\]/);
      value[1] = value[1] === 'class' ? 'className' : value[1];
      value[3] = value[3].slice(1, -1);

      if (value[2]) {
        if (value[2] === '*') {
          self.attributes[value[1]] = new RegExp(value[3]);
        } else if (value[2] === '^') {
          self.attributes[value[1]] = new RegExp('^' + value[3]);
        } else if (value[2] === '$') {
          self.attributes[value[1]] = new RegExp(value[3] + '$');
        }
      } else {
        self.attributes[value[1]] = new RegExp('^' + value[3] + '$');
      }
    });
  }

  return self;
};
