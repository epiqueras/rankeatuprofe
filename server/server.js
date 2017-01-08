/* eslint-disable react/jsx-filename-extension */
import Express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import RateLimit from 'express-rate-limit';

// Webpack requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// React server-side Rendering requirements
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Database config
import serverConfig from './serverConfig';

// Server routes
import search from './routes/search.routes';
import schools from './routes/schools.routes';
import teachers from './routes/teachers.routes';
import reviews from './routes/reviews.routes';

// Webpack config
import webpackDevConfig from '../webpack.config.dev';

// Render function and routes
import render from './render.js';
import routes from '../client/routes';
import ssrFetchData from './ssrFetchData';
import SsrDataProvider from '../client/SsrDataProvider';

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

// MongoDB Connection
mongoose.connect(serverConfig.mongoUrl, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  } else {
    console.log('Connected to database!'); // eslint-disable-line no-console
  }
});

app.enable('trust proxy');

const getLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

const reviewLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  keyGenerator: req => req.ip + req.params.slug,
});

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/api', search);
app.use('/api', schools);
app.use('/api', teachers);
app.use('/api', reviews);
app.use('/api', getLimiter);
app.use('/api/profesor/:slug/review', reviewLimiter);

app.get('*', (req, res) => {
  // eslint-disable-next-line consistent-return
  match({ routes: routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let html;
    // TODO: Pass in data
    if (renderProps) {
      ssrFetchData(req.url, (data) => {
        if (data.error) { return res.status(404).send('Not Found 404'); }
        darkServerTheme.userAgent = req.headers['user-agent'];
        html = renderToString(
          <MuiThemeProvider muiTheme={getMuiTheme(darkServerTheme)}>
            <SsrDataProvider data={data}>
              <RouterContext {...renderProps} />
            </SsrDataProvider>
          </MuiThemeProvider>,
        );
        return res.set('Content-Type', 'text/html').status(200).end(render(html, data));
      });
    } else {
      return res.redirect(302, '/');
    }
  });
});

app.listen(serverConfig.port, () => {
  console.log('App listening on port 3000!'); // eslint-disable-line no-console
});
