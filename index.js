const Component = require("flatman-component");

require("./components/Html");
require("./init/augmentComponent");

module.exports = {
  Component : Component,
  css : require("./tools/css"),
  el : require("./tools/el"),
  page : require("./tools/page"),
  parse : require("./tools/parse"),
  parseFile : require("./tools/parseFile"),
  read : require("./tools/read"),
  script : require("./tools/script"),
};
