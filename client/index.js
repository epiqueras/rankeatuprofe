/* global document */
/* global window */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'flexboxgrid/css/flexboxgrid.min.css';
import './ThemeProvider.css';
import Routes from './routes';
import SsrDataProvider from './SsrDataProvider';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <SsrDataProvider data={window.__INITIAL_STATE__}>
      <Routes />
    </SsrDataProvider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
