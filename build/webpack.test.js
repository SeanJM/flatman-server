const path = require("path");
const promisify = require("util").promisify;
const temp = ".zrnqTXCAoIoxjs.js";
const spawn = require("child_process").spawn;
const unlink = promisify(require("fs").unlink);
const nodeExternals = require("webpack-node-externals");
const resolve = require("./webpack.resolve");
const lstat = promisify(require("fs").lstat);

class RemoveTest {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("Running tests", function (compilation) {
      const { output } = compilation.options;
      const testFile = path.join(output.path, output.filename);

      lstat(testFile)
        .then(() => {
          const cmd = spawn("node", [testFile], { stdio: "inherit" });
          cmd.on("exit", function () {
            unlink(testFile)
              .then(() => unlink(testFile + ".map"))
              .catch((err) => console.log(err));
          });
        })
        .catch(function () {
          return;
        });
    });
  }
}

module.exports = function (__root) {
  return {
    mode: "development",
    target: "node",
    devtool: "source-map",
    entry: "./test/index.js",

    output: {
      libraryTarget: "commonjs2",
      path: path.resolve(__root, "test"),
      filename: temp,
    },

    externals: [nodeExternals()],
    resolve: resolve(__root),
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["env", {
                targets: {
                  node: "current"
                }
              }]
            ],
            plugins: [
              "transform-object-rest-spread",
            ],
          },
        },
      }],
    },

    plugins: [
      new RemoveTest(),
    ],
  };
};