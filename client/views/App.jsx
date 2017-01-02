import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
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
          url: 'pepe-gonzales',
          rating: 4,
          school: 'Colegio Rapido',
          schoolUrl: 'colegio-rapido',
        },
        {
          id: 2,
          name: 'Colegio Rapido',
          url: 'colegio-rapido',
          rating: 4,
        },
      ],
    };
    this.search = this.search.bind(this);
  }

  getChildContext() {
    return { results: this.state.results };
  }

  search(string, index) {
    if (index === -1) {
      this.context.router.push({
        pathname: '/busqueda',
        query: { buscar: string },
      });
    } else {
      return index;
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className="row middle-xs center-xs">
          <div className="col-xs-1">
            <IconButton
              onClick={() => this.context.router.goBack()}
              tooltip="Regresar"
              touch tooltipPosition="bottom-right"
            >
              <ArrowBack />
            </IconButton>
          </div>
          <div className="col-xs-11" style={{ marginTop: -20 }}>
            <AutoComplete
              floatingLabelText="Busca..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.suggestions}
              maxSearchResults={5}
              onNewRequest={this.search}
              fullWidth
            />
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.childContextTypes = {
  results: React.PropTypes.array,
};
