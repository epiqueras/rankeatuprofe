import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';
// import { Link } from 'react-router';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [
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
      ],
      results: [
        {
          id: 1,
          name: 'Pepe Gonzales',
          rating: 4,
          attractiveness: 2,
          school: 'Colegio Rapido',
        },
        {
          id: 2,
          name: 'Colegio Rapido',
          rating: 4,
        },
      ],
    };
  }

  getChildContext() {
    return { results: this.state.results };
  }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Busca..."
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.suggestions}
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

App.childContextTypes = {
  results: React.PropTypes.array,
};
