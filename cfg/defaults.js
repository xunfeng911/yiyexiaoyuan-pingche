/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 3040;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
        // !css?modules&localIdentName=[name]_[local]-[hash:base64:5]
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded!sass-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
      },
      // {
      //   test: /\.scss/,
      //   exclude: path.resolve(__dirname, 'src/public/css'),
      //   loader: 'style!css?modules&localIdentName=[name]_[local]!sass?sourceMap=true'
      // },
      // {
      //   test: /\.scss/,
      //   include: path.resolve(__dirname, 'src/public/css'),
      //   loader: 'style!css!sass?sourceMap=true'
      // },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader!less-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
