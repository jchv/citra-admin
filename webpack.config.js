var path = require('path');
var webpack = require('webpack');
var appRoot = __dirname + '/src/scripts';

module.exports = {
  entry: [
    appRoot + '/index.js'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'script.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  },
  devtool: 'eval'
};
