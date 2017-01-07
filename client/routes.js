/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from './views/Home';
import HomePage from './pages/HomePage';

import App from './views/App';
import ResultsPage from './pages/ResultsPage';
import TeacherPage from './pages/TeacherPage';
import ReviewPage from './pages/ReviewPage';
import SchoolPage from './pages/SchoolPage';

injectTapEventPlugin();

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={HomePage} />
    </Route>
    <Route path="/busqueda/:type" component={App}>
      <IndexRoute component={ResultsPage} />
      <Route path="/profesor/:slug" component={TeacherPage} />
      <Route path="/profesor/:slug/review" component={ReviewPage} />
      <Route path="/escuela/:slug" component={SchoolPage} />
    </Route>
  </Router>
);
