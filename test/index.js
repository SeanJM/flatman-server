require("source-map-support").install();

const tinyTest = require("tiny-test");
const toHtmlTest = require("./to-html-test");
const htmlComponentTest = require("./html-component-test");
const higherOrderComponent = require("./higher-order-component-test");
const createElementTest = require("./create-element-test");
const appendTest = require("./append-test");
const isTest = require("./is-test");

tinyTest(function (test, load) {
  createElementTest(test);
  appendTest(test);
  toHtmlTest(test);
  htmlComponentTest(test);
  higherOrderComponent(test);
  isTest(test);
  load();
});
