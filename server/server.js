/* eslint-disable react/jsx-filename-extension */
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../client/routes';

import render from './render.js';

const app = new Express();

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    let html;
    if (renderProps) {
      html = renderToString(<RouterContext {...renderProps} />);
    } else {
      return res.redirect(302, '/');
    }

    return res.set('Content-Type', 'text/html').status(200).end(render(html));
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
