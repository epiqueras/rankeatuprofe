import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';
// import { Link } from 'react-router';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    const dataSource1 = [
      {
        text: 'text-value1',
        value: (
          <MenuItem
            primaryText="profesor pepe"
            secondaryText={<ActionBook style={{ marginTop: 11 }} />}
          />
        ),
      },
      {
        text: 'text-value2',
        value: (
          <MenuItem
            primaryText="colegio bob"
            secondaryText={<SocialSchool style={{ marginTop: 11 }} />}
          />
        ),
      },
    ];

    return (
      <div>
        <AutoComplete
          floatingLabelText="Busca..."
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource1}
          maxSearchResults={5}
          fullWidth
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};
