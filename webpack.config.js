'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var BUILD_DIR = path.join(__dirname, '/dist/');
var APP_DIR = path.join(__dirname, '/src/');

var config = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    APP_DIR + 'main.js',
  ],
  output: {
      path: BUILD_DIR,
      filename: '[name]-[hash].min.js'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: APP_DIR+ 'index.html',
        inject: 'body',
        filename: 'index.html'
      }),
      new ExtractTextPlugin('[name]-[hash].min.css'),
      // removes a lot of debugging code in React
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      // keeps hashes consistent between compilations
      new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "stage-0", "react"]
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:7]!postcss')
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};

module.exports = config;
