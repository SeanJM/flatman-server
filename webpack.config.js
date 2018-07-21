const test = require("./build/webpack.test");
const backend = require("./build/webpack.backend");
module.exports = process.env.NODE_ENV === "test"
  ? test(__dirname)
  : backend(__dirname);