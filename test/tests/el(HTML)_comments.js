const el   = require("../../index");
const value = `<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="X-UX-Compatible" content="IE=edge,chrome=1">
    <meta charset="UTF-8">
  </head>
  <body>
    <!--comment-->
  </body>
</html>
`;

module.exports = {
  name : "el(\'HTML\')",
  this() {
    var c = el().html("<!--comment-->").children()[0];
    var a = el("HTML", [ c ]);
    var str = a.toHtml();
    return str;
  },
  isEqual() {
    return value;
  }
};