import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

// TODO:
// Make teacher and school list items.

export default class ResultsPage extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleNestedListToggle(item) {
    this.setState({
      open: item.state.open,
    });
  }

  render() {
    return (
      <div>
        <Paper zDepth={4}>
          <List>
            <Subheader>Resultados</Subheader>
            <ListItem
              primaryText="Pepe Gonzales"
              leftIcon={<ActionBook />}
              primaryTogglesNestedList
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Calidad: 4/5"
                  leftIcon={<ActionGrade />}
                  disabled
                />,
                <ListItem
                  key={3}
                  primaryText="Colegio Rapido"
                  leftIcon={<SocialSchool />}
                  disabled
                />,
              ]}
            />
          </List>
        </Paper>
      </div>
    );
  }
}
