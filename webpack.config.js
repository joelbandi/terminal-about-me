var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'lodash',
  'react',
  'redux',
  'react-dom',
  'react-redux',
]

var config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }),
    new htmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  }
}

module.exports = config;