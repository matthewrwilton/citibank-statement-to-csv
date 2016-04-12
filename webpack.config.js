var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './www'),
    publicPath: './',
    filename: 'bundle.js'
  },
  externals: {
    "jquery": "jQuery"
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