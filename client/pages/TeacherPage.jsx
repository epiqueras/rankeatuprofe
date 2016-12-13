import React, { Component } from 'react';
// import { Link } from 'react-router';

import TeacherCard from 'components/TeacherCard';

export default class TeacherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {
        id: 1,
        name: 'Pepe Gonzales',
        rating: 4,
        attractiveness: 2,
        school: 'Colegio Rapido',
        numberOfReviews: 14,
        takesAttendance: 5,
        wouldTakeAgain: 5,
        zeroToTwo: 2,
        threeToFive: 2,
        sixToEight: 2,
        nineToEleven: 2,
        twelveToFourteen: 2,
        fifteenToSeventeen: 2,
        eighteenToTwenty: 2,
      },
    };
  }

  render() {
    return (
      <div>
        {!this.state.teacher ?
          'loading....'
        :
          <TeacherCard teacher={this.state.teacher} />
        }
      </div>
    );
  }
}

TeacherPage.propTypes = {
  params: React.PropTypes.object,
};
