import React, { Component } from 'react';
import Alert from 'react-s-alert';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

import RootHelmet from './RootHelmet';
import apiCaller from '../utils/apiCaller';
import { go, goBack, goBackReview } from '../utils/goBack';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      suggestions: [],
      previousSuggestions: [],
      results: this.context.data.results || [],
    };
    this.search = this.search.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  getChildContext() {
    return { results: this.state.results };
  }

  getSuggestions(string) {
    if (string.length < 20 && string.length % 2 === 0
      && !this.state.previousSuggestions.includes(string)) {
      const addedSuggestions = this.state.previousSuggestions;
      addedSuggestions.push(string);
      this.setState({ previousSuggestions: addedSuggestions });
      return apiCaller(`/busqueda/${this.props.params.type}?nombre=${string}`).then(res => (
        this.setState({ suggestions: res.results })
      ));
    }
    return null;
  }

  search(string, index) {
    if (index === -1) {
      this.context.router.replace({
        pathname: `/busqueda/${this.props.params.type || 'ambos'}`,
        query: { nombre: string },
      });
      return apiCaller(`/busqueda/${this.props.params.type}?nombre=${string}`).then(res => (
        this.setState({ results: res.results })
      ));
    }
    const chosenSuggestion = this.state.suggestions.find(suggestion => (
      suggestion.name === string.text
    ));
    go();
    if (chosenSuggestion.schoolId) {
      return this.context.router.push(`/profesor/${chosenSuggestion.slug}`);
    }
    return this.context.router.push(`/escuela/${chosenSuggestion.slug}`);
  }

  render() {
    const goBackFunction = this.props.location.pathname.includes('/review') ? goBackReview : goBack;
    const suggestions = this.state.suggestions.map(suggestion => (
      suggestion.schoolId ?
      {
        text: suggestion.name,
        value: (
          <MenuItem
            primaryText={`${suggestion.name} de ${suggestion.schoolName}`}
            secondaryText={<ActionBook style={{ marginTop: 11 }} />}
          />
        ),
      }
      :
      {
        text: suggestion.name,
        value: (
          <MenuItem
            primaryText={suggestion.name}
            secondaryText={<SocialSchool style={{ marginTop: 11 }} />}
          />
        ),
      }
    ));
    return (
      <div>
        <RootHelmet />
        <div className="row middle-xs center-xs">
          <div className="col-xs-1">
            <IconButton
              onTouchTap={goBackFunction}
              tooltip="Regresar"
              touch tooltipPosition="bottom-right"
              className="back-arrow"
            >
              <ArrowBack />
            </IconButton>
          </div>
          <div className="col-xs-11" style={{ marginTop: -20 }}>
            <AutoComplete
              id="search-bar"
              floatingLabelText="Busca..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={suggestions}
              maxSearchResults={5}
              onNewRequest={this.search}
              onUpdateInput={this.getSuggestions}
              fullWidth
            />
          </div>
        </div>
        {this.props.children}
        <Alert
          stack={{ limit: 1 }}
          effect="bouncyflip"
        />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
  data: React.PropTypes.object,
};

App.childContextTypes = {
  results: React.PropTypes.array,
};
