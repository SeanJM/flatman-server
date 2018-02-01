const el = require("../../index");

module.exports = {
  name : "is() (.class1.class2)",
  this() {
    var a = el({ class : "class1 class2" });
    return a.is(".class1.class2") && a.is(".class2.class1") && a.is(".class2") && a.is(".class1");
  },
  isEqual() {
    return true;
  }
};