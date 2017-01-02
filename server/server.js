/* eslint-disable react/jsx-filename-extension */
import Express from 'express';

// Webpack requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Server-side Rendering requirements
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import webpackDevConfig from '../webpack.config';
import render from './render.js';
import routes from '../client/routes';

const app = new Express();

const darkServerTheme = darkBaseTheme;

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  match({ routes: routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let html;
    if (renderProps) {
      darkServerTheme.userAgent = req.headers['user-agent'];
      html = renderToString(
        <MuiThemeProvider muiTheme={getMuiTheme(darkServerTheme)}>
          <RouterContext {...renderProps} />
        </MuiThemeProvider>,
      );
    } else {
      return res.redirect(302, '/');
    }

    return res.set('Content-Type', 'text/html').status(200).end(render(html));
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
