var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "./www"),
    publicPath: "./",
    filename: "bundle.js"
  },
  externals: {
    jquery: "jQuery"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })*/
  ]
};