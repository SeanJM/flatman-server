const colors = require('colors');
const report = {};

report.error = function (e) {
  console.log(e);
};

module.exports = report;
