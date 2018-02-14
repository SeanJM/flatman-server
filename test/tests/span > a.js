const el = require("../../index");

module.exports = {
  name : "span > a",
  this() {
    const a = el().html("<span>this test <a>Text</a></span>");
    return JSON.parse(JSON.stringify(a.children()[0]));
  },
  isDeepEqual() {
    return {
      "tagName": "span",
      "attributes": {
        "style": {},
        "className": [],
        "disabled": null,
        "name": null
      },
      "childNodes": [
        "this test ",
        {
          "tagName": "a",
          "attributes": {
            "style": {},
            "className": [],
            "disabled": null,
            "name": null
          },
          "childNodes": [
            "Text"
          ]
        }
      ]
    };
  }
};