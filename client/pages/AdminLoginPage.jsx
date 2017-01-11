import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import apiCaller from '../utils/apiCaller';

export default class AdminLoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      usernameError: null,
      password: '',
      passwordError: null,
      authError: null,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    return apiCaller('/admin-check-auth').then((res) => {
      if (res.authenticated) {
        return this.context.router.replace('/admin-aiwhdnwoauhcawhuca/portal');
      }
      return null;
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  submitForm() {
    let formIncomplete = false;
    if (!this.state.username) {
      formIncomplete = true;
      this.setState({ usernameError: 'Ingrese un nombre de usuario' });
    } else {
      this.setState({ usernameError: null });
    }
    if (!this.state.password) {
      formIncomplete = true;
      this.setState({ passwordError: 'Ingrese una contrasena' });
    } else {
      this.setState({ passwordError: null });
    }
    if (formIncomplete) { return null; }
    return apiCaller('/admin-login', 'post', {
      username: this.state.username,
      password: this.state.password,
    }).then((res) => {
      if (res.result === 'success') {
        return this.context.router.push('/admin-aiwhdnwoauhcawhuca/portal');
      }
      return this.setState({ authError: res.error });
    });
  }

  render() {
    return (
      <div className="row center-xs middle-xs">
        <Helmet title="Admin Login" meta={[{ name: 'robots', content: 'noindex' }]} />
        <div className="col-xs-12 login-column">
          <br /><br />
          <h2 style={{ color: 'white' }}>Login Portal</h2>
          <TextField
            id="username-input"
            type="text"
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            errorText={this.state.usernameError}
          />
          <br />
          <TextField
            id="password-input"
            type="password"
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            errorText={this.state.passwordError}
          />
          <br /><br /><br />
          <div className="col-xs-12" style={{ color: '#F44336', marginBottom: '5px' }}>
            {this.state.authError}
          </div>
          <br /><br />
          <RaisedButton
            onTouchTap={this.submitForm}
            label="Sign In"
            primary
          />
        </div>
      </div>
    );
  }
}

AdminLoginPage.contextTypes = {
  router: React.PropTypes.object,
};
