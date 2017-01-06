module.exports = function createComponent(Constructor, opt, arr) {
  let component = new Constructor(opt);
  let name = Constructor.name || 'Anonymous Component';
  let childNodes = [];
  let text = [];

  var afterRender = {
    once : [],
    on : [],
    id : false,
    className : false
  };

  function getNames(node) {
    node.childNodes.forEach(function (child) {
      var name = isDomNode(child) ? child.name() : child.dict.name;
      if (name) {
        if (component.node[name]) {
          throw 'Invalid name \'' + name + '\', this name is already taken.';
        }
        component.node[name] = child;
      }
      getNames(child);
    });
  }

  component.dict = component.dict || {};
  component.childNodes = component.childNodes || [];

  if (typeof component.render === 'function') {
    for (k in opt) {
      if (k.slice(0, 4) === 'once') {
        afterRender.once.push({
          name : k.slice(4).toLowerCase(),
          callback : opt[k]
        });
      } else if (k.slice(0, 2) === 'on') {
        afterRender.on.push({
          name : k.slice(2).toLowerCase(),
          callback : opt[k]
        });
      } else if (k === 'className') {
        afterRender.className = opt[k];
      } else if (k === 'id') {
        afterRender.id = opt[k];
      } else {
        component.dict[k] = opt[k];
      }
    }

    component.node = {
      document : component.render(opt)
    };

    if (component.node.document) {
      getNames(component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }

    afterRender.once.forEach(function (def) {
      component.once(def.name, def.callback);
    });

    afterRender.on.forEach(function (def) {
      component.on(def.name, def.callback);
    });

    if (afterRender.className) {
      if (component.addClass) {
        component.addClass(afterRender.className);
      } else {
        component.node.document.addClass(afterRender.className);
      }
    } else if (afterRender.id) {
      if (component.attr) {
        component.attr('id', afterRender.id);
      } else {
        component.node.document.attr('id', afterRender.className);
      }
    }
  } else {
    // Code block to be gradually phased out
    if (!isComponent(component)) {
      throw new Error('invalid component: \"' + name + '\", the constructor must have property called \'node\' which contains a root named \'document\'');
    }

    // Assign to value of 'this' first
    for (var k in opt) {
      if (typeof component[k] === 'undefined') {
        component[k] = opt[k];
      } else if (k === 'dict') {
        Object.assign(component[k], opt[k]);
      }
    }

    for (var k in opt) {
      if (k === 'className') {
        component.addClass(opt[k]);
      } else if (k === 'id') {
        component.attr('id', opt[k]);
      } else if (typeof component[k] === 'function') {
        component[k](opt[k]);
      }
    }
  }

  arr.forEach(function (a) {
    if (typeof a === 'string' || typeof a === 'number') {
      text.push(a);
    } else {
      childNodes.push(a);
    }
  });

  if (childNodes.length) {
    if (typeof component.append === 'function') {
      component.append(childNodes);
    } else {
      component.node.document.append(childNodes);
    }
    [].push.apply(component.childNodes, childNodes);
  }

  if (text.length) {
    if (typeof component.text === 'function') {
      component.text.apply(component, text);
    } else {
      throw new Error('invalid component \'' + name + '\', the constructor must have a \'text\' method.');
    }
  }

  return component;
};