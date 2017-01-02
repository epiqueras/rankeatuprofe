/* global document */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes';

injectTapEventPlugin();

ReactDOM.render(<Routes />,
  document.getElementById('app'),
);
