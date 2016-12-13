/* global document */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ThemeProvider from 'ThemeProvider';

import Home from 'views/Home';
import HomePage from 'pages/HomePage';

import App from 'views/App';
import ResultsPage from 'pages/ResultsPage';
import TeacherPage from 'pages/TeacherPage';


export default () => (
  <Router history={browserHistory}>
    <Route component={ThemeProvider}>
      <Route path="/" component={Home}>
        <IndexRoute component={HomePage} />
      </Route>
      <Route path="/busqueda" component={App}>
        <IndexRoute component={ResultsPage} />
        <Route path="/profesor/:teacherName" component={TeacherPage} />
      </Route>
    </Route>
  </Router>
);
