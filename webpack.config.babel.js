const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules(?!\/flexboxgrid)(?!\/react-s-alert)/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
