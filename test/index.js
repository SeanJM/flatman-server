require("source-map-support").install();

const tinyTest = require("tiny-test");
const toHtmlTest = require("./to-html-test");
const htmlComponentTest = require("./html-component-test");
const higherOrderComponent = require("./higher-order-component-test");
const createElementTest = require("./create-element-test");
const appendTest = require("./append-test");
const setStateTest = require("./set-state-test");
const expandVNodeTest = require("./expand-vnode");
const attributesTest = require("./attributes-test");

tinyTest(function (test, load) {
  createElementTest(test);
  appendTest(test);
  expandVNodeTest(test);
  setStateTest(test);
  toHtmlTest(test);
  htmlComponentTest(test);
  higherOrderComponent(test);
  attributesTest(test);
  load();
});
