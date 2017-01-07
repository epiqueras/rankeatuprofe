const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: ['webpack-hot-middleware/client', './client/index.js'],
    vendor: ['react', 'react-dom'],
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
  ],

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
        exclude: /node_modules(?!\/flexboxgrid)(?!\/react-s-alert)/,
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
