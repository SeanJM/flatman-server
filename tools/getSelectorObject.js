module.exports = function getSelectorObject(selector) {
  let classes = selector.match(/\.[a-zA-Z0-9\-\_]+/g);
  let id = selector.match(/\#[a-zA-Z0-9\-\_]+/);
  let attr = selector.match(/\[[^\]]+?\]/g);
  let tagName = selector.match(/^[a-zA-Z0-9\-\_]+/);

  let selectorObject = {
    tagName : tagName ? tagName[0] : false,
    attributes : {}
  };

  if (classes) {
    selectorObject.attributes.className = classes.map(a => a.slice(1));
  }

  if (id) {
    selectorObject.attributes.id = id[0].slice(1);
  }

  if (attr) {
    attr.forEach(function (string) {
      let value = string.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);
      value[1] = value[1] === 'class' ? 'className' : value[1];
      value[3] = value[3] ? value[3].slice(1, -1) : false;

      if (value[2]) {
        if (value[2] === '*') {
          selectorObject.attributes[value[1]] = new RegExp(value[3]);
        } else if (value[2] === '^') {
          selectorObject.attributes[value[1]] = new RegExp('^' + value[3]);
        } else if (value[2] === '$') {
          selectorObject.attributes[value[1]] = new RegExp(value[3] + '$');
        }
      } else if (value[3]) {
        selectorObject.attributes[value[1]] = new RegExp('^' + value[3] + '$');
      } else {
        selectorObject.attributes[value[1]] = new RegExp('.+');
      }
    });
  }

  return selectorObject;
};
