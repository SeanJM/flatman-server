const el = require("../src/index");
const { Component, Html } = require("../src/index");

module.exports = function (test) {
  test("el(Html) onMount", function () {
    let a = [false, false];

    class T extends Component {
      render() {
        return el("div", {
          class: "t",
          onMount: () => {
            a[1] = true;
          }
        });
      }
    }

    el(Html, [
      el(T),
      el("div", {
        onMount: () => {
          a[0] = true;
        }
      })
    ]).toHtml();

    return a[0] === a[1];
  }).isEqual(true);

  test("el(Html) onMount - method", function () {
    let a = [false, false];

    class T extends Component {
      onMount() {
        a[1] = true;
      }

      render() {
        return el();
      }
    }

    el(Html, [
      el(T),
      el({
        onMount: () => {
          a[0] = true;
        }
      })
    ]).toHtml();

    return a[0] === a[1];
  }).isEqual(true);

  test("el(Html) onUnmount - method", function () {
    let a = [false, false];
    let b = el(Html);

    class T extends Component {
      onMount() {
        a[0] = true;
      }

      onUnmount() {
        a[1] = true;
      }

      render() {
        return el();
      }
    }

    let t = el(T);
    b.append(t);
    t.remove();

    return a[0] === a[1];
  }).isEqual(true);

  test("el(Html) onMount - check parent", function () {
    let hasBodyParent = false;

    class T extends Component {
      onMount() {
        hasBodyParent = !!this.node.closest("body");
      }

      render() {
        return el();
      }
    }

    el(Html, el(T));

    return hasBodyParent;
  }).isEqual(true);
};