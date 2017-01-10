import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/RaisedButton';

import apiCaller from '../utils/apiCaller';

// TODO: Add review and teacher acceptance and deletion and display pendings.

export default class AdminPortalPage extends Component {
  constructor() {
    super();
    this.state = {
      pendings: [],
    };
    this.getPendings = this.getPendings.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() { // eslint-disable-line
    return apiCaller('/admin-check-auth').then((res) => {
      if (res.authenticated) {
        return null;
      }
      return this.context.router.replace('/');
    });
  }

  componentDidMount() {
    this.getPendings();
  }

  getPendings() { // eslint-disable-line
    return apiCaller('/admin-get-pendings').then(res => (
      this.setState({ pendings: res.pendings })
    ));
  }

  logout() { // eslint-disable-line
    return apiCaller('/admin-logout').then((res) => {
      if (res.result === 'success') {
        return this.context.router.replace('/admin-aiwhdnwoauhcawhuca/login');
      }
      return null;
    });
  }

  render() {
    const pendings = this.state.pendings.map(pending => (
      <div key={pending._id}>{pending.name}</div>
    ));
    return (
      <div className="row center-xs middle-xs">
        <Helmet title="Admin Portal" meta={[{ name: 'robots', content: 'noindex' }]} />
        Portal Page
        {pendings}
        <RaisedButton
          onTouchTap={this.logout}
          label="Log out"
          primary
        />
      </div>
    );
  }
}

AdminPortalPage.contextTypes = {
  router: React.PropTypes.object,
};
