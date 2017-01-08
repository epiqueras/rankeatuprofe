/* eslint-disable global-require */

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
  process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
  require('./dist/server.bundle.js');
} else {
  require('babel-register')({
    plugins: [
      [
        'babel-plugin-webpack-loaders',
        {
          config: './webpack.config.babel.js',
          verbose: false,
        },
      ],
    ],
  });
  require('babel-polyfill');
  require('./server/server');
}
