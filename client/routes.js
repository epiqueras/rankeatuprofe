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

import Admin from './views/Admin';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPortalPage from './pages/AdminPortalPage';

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
    <Route path="/admin-aiwhdnwoauhcawhuca" component={Admin}>
      <Route path="login" component={AdminLoginPage} />
      <Route
        path="portal"
        component={AdminPortalPage}
      />
    </Route>
  </Router>
);
