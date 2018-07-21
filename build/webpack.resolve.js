const path = require("path");

module.exports = function (__root) {
  return {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__root, "src"),
      "@class": path.resolve(__root, "src/class"),
      "@components": path.resolve(__root, "src/components"),
      "@constants": path.resolve(__root, "src/constants"),
      "@predicates": path.resolve(__root, "src/predicates"),
      "@src": path.resolve(__root, "src/"),
      "@tools": path.resolve(__root, "src/tools"),
    },
  };
};