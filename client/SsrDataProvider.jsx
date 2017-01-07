import React, { Component } from 'react';

export default class SsrDataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }

  getChildContext() {
    return { data: this.state.data };
  }

  render() {
    return this.props.children;
  }
}

SsrDataProvider.propTypes = {
  data: React.PropTypes.object,
  children: React.PropTypes.object,
};

SsrDataProvider.childContextTypes = {
  data: React.PropTypes.object,
};
