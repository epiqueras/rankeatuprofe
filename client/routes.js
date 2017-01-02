/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ThemeProvider from './ThemeProvider';

import Home from './views/Home';
import HomePage from './pages/HomePage';

import App from './views/App';
import ResultsPage from './pages/ResultsPage';
import TeacherPage from './pages/TeacherPage';
import ReviewPage from './pages/ReviewPage';
import SchoolPage from './pages/SchoolPage';

export default (
  <Router history={browserHistory}>
    <Route component={ThemeProvider}>
      <Route path="/" component={Home}>
        <IndexRoute component={HomePage} />
      </Route>
      <Route path="/busqueda" component={App}>
        <IndexRoute component={ResultsPage} />
        <Route path="/profesor/:teacherUrl" component={TeacherPage} />
        <Route path="/profesor/:teacherUrl/review" component={ReviewPage} />
        <Route path="/escuela/:schoolUrl" component={SchoolPage} />
      </Route>
    </Route>
  </Router>
);
