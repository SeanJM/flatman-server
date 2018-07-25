const Component = require("./src/class/component");
const el = require("./src/create/create-element");

el.Component = Component;
el.Html = require("./src/components/html");
el.Css = require("./src/components");

module.exports = el;
