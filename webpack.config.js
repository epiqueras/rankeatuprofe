const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: './client/index.js',
    html: './index.html',
    vendor: ['react', 'react-dom'],
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/dist'),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve('./client'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },

  eslint: {
    configFile: './.eslintrc',
  },
};
