function toType(value) {
  return value === 'true'
    ? true
    : value === 'false'
      ? false
      : /^[\d]+$/.test(value)
        ? Number(value)
        : value;
}

function getSelectorObject(selector) {
  let i = 0;
  let n = selector ? selector.length : 0;
  let key = '';
  let value = '';
  let tagName = '';
  let attrChar = ['.', '#', '[', ']'];
  let attributes = {
    class : [],
    id : [],
  };

  function capture(delimiter) {
    while (selector[i] !== delimiter && selector[i - 1] !== '\\' && selector[i] !== ']' && i < n) {
      value += selector[i];
      i++;
    }

    attributes[key.trim()] = toType(value);
    key = '';
    value = '';
  }

  function setAttr() {
    i++; // Pass the open ([) brace
    while (selector[i] !== ']' && i < n) {
      while (selector[i] !== '=' && selector[i] !== ']' && i < n) {
        key += selector[i];
        i++;
      }

      i++; // Pass the equal sign

      if (selector[i] === '\'' || selector[i] === '\"') {
        i++;
        capture(selector[i - 1]);
      } else if (i < n) {
        // No delimiter
        capture(' ');
      } else if (key.length) {
        attributes[key.trim()] = true;
      }

      i++;
    }
  }

  function captureClass() {
    i++;
    attributes.class.push('');

    while (attrChar.indexOf(selector[i]) === -1 && i < n) {
      if (!/\s/.test(selector[i])) {
        attributes.class[attributes.class.length - 1] += selector[i];
      }
      i++;
    }

    if (selector[i] === '.') {
      captureClass();
    }
  }

  function captureId() {
    i++;
    attributes.id.push('');

    while (attrChar.indexOf(selector[i]) === -1 && i < n) {
      attributes.id[attributes.id.length - 1] += selector[i];
      i++;
    }

    if (selector[i] === '#') {
      captureId();
    }
  }

  while (n && /^[\w]/.test(selector[i]) && i < n) {
    tagName += selector[i];
    i++;
  }

  while (i < n) {
    if (selector[i] === '.') {
      captureClass();
    }

    if (selector[i] === '#') {
      captureId();
    }

    if (selector[i] === '[') {
      setAttr();
    }

    i++;
  }

  attributes.class = attributes.class.sort().join(' ');
  attributes.id = attributes.id.sort().join('-');

  return {
    tagName : tagName.length ? tagName : false,
    attributes : attributes
  };
}

module.exports = getSelectorObject;
