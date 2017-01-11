import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';

import PendingTeacherListItem from '../components/PendingTeacherListItem';
import PendingReviewListItem from '../components/PendingReviewListItem';

import apiCaller from '../utils/apiCaller';

export default class AdminPortalPage extends Component {
  constructor() {
    super();
    this.state = {
      pendings: [],
    };
    this.getPendings = this.getPendings.bind(this);
    this.logout = this.logout.bind(this);
    this.removePending = this.removePending.bind(this);
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

  removePending(pending) {
    const pendings = this.state.pendings;
    const index = pendings.indexOf(pending);
    if (index !== -1) {
      pendings.splice(index, 1);
      this.setState({ pendings });
    }
  }

  render() {
    const pendingList = this.state.pendings.map((pending) => {
      if (pending.teacherId) {
        return (
          <PendingReviewListItem
            key={pending._id}
            review={pending}
            removePending={this.removePending}
          />
        );
      }
      return (
        <PendingTeacherListItem
          key={pending._id}
          teacher={pending}
          removePending={this.removePending}
        />
      );
    });
    return (
      <div className="row center-xs middle-xs">
        <Helmet title="Admin Portal" meta={[{ name: 'robots', content: 'noindex' }]} />
        <div className="col-xs-12">
          <Paper zDepth={4}>
            <List style={{ marginTop: 25 }}>
              <div className="row">
                <div className="col-xs-6">
                  <Subheader>Pendings: </Subheader>
                </div>
                <div className="col-xs-6">
                  <RaisedButton
                    onTouchTap={this.logout}
                    label="Log out"
                    primary
                  />
                </div>
              </div>
              {pendingList.length === 0 ?
                <Subheader style={{ textAlign: 'center' }}>No quedan pendientes...</Subheader>
              :
                pendingList
              }
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

AdminPortalPage.contextTypes = {
  router: React.PropTypes.object,
};
