const { DefinePlugin } = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const resolve = require("./webpack.resolve");
const nodeExternals = require("webpack-node-externals");

module.exports = function (__root) {
  return {
    mode: process.env.NODE_ENV === "production"
      ? "production"
      : "development",

    target: "node",
    entry: "./src/index.js",

    output: {
      libraryTarget: "commonjs2",
      libraryExport: "default",
      path: path.resolve(__root),
      filename: "index.js",
    },

    resolve: resolve(__root),
    externals: [nodeExternals()],

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            plugins: [
              "transform-object-rest-spread",
            ],
          },
        },
      }],
    },

    plugins: process.env.NODE_ENV === "production"
      ? [
        new DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new UglifyJsPlugin(),
      ]
      : [
        new DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
      ],
  };
};