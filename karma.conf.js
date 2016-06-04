var path = require("path");

module.exports = function (config) {
  config.set({
    logLevel: config.LOG_DEBUG,
    port: 3334,
    browsers: ["PhantomJS"],
    singleRun: true,
    frameworks: ["jasmine"],
    files: [
      "src/**/*Tests.ts"
    ],
    preprocessors: {
      "src/**/*Tests.ts": ["webpack", "sourcemap"]
    },
    reporters: ["progress"],
    webpack: require("./webpack.config.js"),
    webpackServer: { noInfo: true },
  });
};
