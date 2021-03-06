'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var htmlMinify = require('html-minify-loader');

var BUILD_DIR = path.join(__dirname, '/dist/');
var APP_DIR = path.join(__dirname, '/src/');

var config = {
entry: [
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
      template: APP_DIR + 'index.html',
      inject: 'body',
      filename: 'index.html'
  }),
  new ExtractTextPlugin('[name]-[hash].min.css'),
  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production')
      }
  }),
  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),
  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
      compressor: {
          warnings: false,
          screw_ie8: true
      }
  }),
  new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
  }),
],
module: {
  loaders: [
      {
        test: /\.html$/,
        name: "mandrillTemplates",
        loader: 'raw!html-minify'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            "presets": ["es2015", "stage-0", "react"]
        },
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:7]!postcss')
      },
  ]
},
'html-minify-loader': {
   empty: true,        // KEEP empty attributes
   cdata: true,        // KEEP CDATA from scripts
   comments: true,     // KEEP comments
   dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
          lowerCaseAttributeNames: false,      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
   }
},
postcss: [
      require('autoprefixer')
]

};

module.exports = config;