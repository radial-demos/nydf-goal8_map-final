const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/assets/bundles'),
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: { presets: ['env'] },
      }],
    }, {
      test: /\.css$/,
      // use: ['style-loader', 'css-loader'],
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
      }),
    },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
    }),
  ],
};
