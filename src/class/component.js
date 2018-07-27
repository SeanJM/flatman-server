module.exports = class Component {
  /**
   * @param {object} props - The component properties
  */
  constructor(props = {}) {
    this.props = props;
    this.ref = props.ref;
    this.refs = {};
    this.state = {};
    this.__subscribers = {
      onComponentDidUpdate: [],
      onComponentWillUpdate: [],
    };
  }

  /**
   * @param {object} state - The new component state
  */
  setState(state) {
    const prevProps = this.props;
    const prevState = this.state;
    this.state = state;
    this.__emitComponentDidUpdate(prevProps, prevState);
  }

  __subscribeComponentDidUpdate(callback) {
    this.__subscribers.onComponentDidUpdate.push(callback);
  }

  __emitBeforeComponentToHtml(node) {
    if (typeof this.beforeComponentToHtml === "function") {
      this.beforeComponentToHtml(node);
    }
  }

  __emitAfterComponentToHtml(node) {
    if (typeof this.afterComponentToHtml === "function") {
      this.afterComponentToHtml(node);
    }
  }

  __emitComponentDidUpdate(state, prevState) {
    let i = -1;
    const n = this.__subscribers.onComponentDidUpdate.length;
    while (++i < n) {
      this.__subscribers.onComponentDidUpdate[i](state, prevState);
    }
  }

  __isComponent() {
    return true;
  }
};