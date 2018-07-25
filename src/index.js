const Component = require("./class/component");
const el = require("./create/create-element");

el.Component = Component;
el.Html = require("./components/html");
el.Css = require("./components");

module.exports = el;
