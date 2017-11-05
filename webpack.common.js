// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js')
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'App.js'),
  output: {
    path: paths.DIST,
    filename: 'static/js/App.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(paths.SRC, 'index.html'),
      filename: 'templates/index.html'
    }),
    //new webpack.DefinePlugin({
      //__SITE_URL__: "'http://hanze.compsy.nl'"
    //}),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
