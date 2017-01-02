import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';

import SchoolCard from '../components/SchoolCard';
import TeacherListItem from '../components/TeacherListItem';

export default class SchoolPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: {
        id: 1,
        name: 'Colegio Rapido',
        url: 'colegio-rapido',
        averageRating: 4,
        numberOfReviews: 14,
        wouldTakeAgain: 5,
        zeroToTwo: 2,
        threeToFive: 2,
        sixToEight: 2,
        nineToEleven: 2,
        twelveToFourteen: 2,
        fifteenToSeventeen: 2,
        eighteenToTwenty: 2,
      },
      teachers: [
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
          name: 'Girafalez Rodriguez',
          url: 'girafalez-rodriguez',
          rating: 5,
          school: 'Colegio Rapido',
          schoolUrl: 'colegio-rapido',
        },
      ],
    };
  }

  render() {
    const teachersList = this.state.teachers.map(teacher => (
      <TeacherListItem key={teacher.id} teacher={teacher} inSchoolList />
    ));
    return (
      <div>
        {!this.state.school ?
          'loading....'
        :
          <div>
            <SchoolCard school={this.state.school} />
            <Paper zDepth={4}>
              <List style={{ marginTop: 25 }}>
                <Subheader>Profesores:</Subheader>
                {teachersList.length === 0 ?
                  <Subheader style={{ textAlign: 'center' }}>No se encontro nada...</Subheader>
                :
                  teachersList
                }
              </List>
            </Paper>
          </div>
        }
      </div>
    );
  }
}

SchoolPage.propTypes = {
  params: React.PropTypes.object,
};
