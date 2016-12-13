import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';

import SchoolListItem from 'components/SchoolListItem';
import TeacherListItem from 'components/TeacherListItem';

const ResultsPage = ({}, context) => { // eslint-disable-line no-empty-pattern
  const resultsList = context.results.map((result) => {
    if (result.school) {
      return <TeacherListItem key={result.id} teacher={result} />;
    } else { // eslint-disable-line no-else-return
      return <SchoolListItem key={result.id} school={result} />;
    }
  });
  return (
    <div>
      <Paper zDepth={4}>
        <List>
          <Subheader>Resultados</Subheader>
          {resultsList}
        </List>
      </Paper>
    </div>
  );
};

ResultsPage.contextTypes = {
  results: React.PropTypes.array,
};

export default ResultsPage;
