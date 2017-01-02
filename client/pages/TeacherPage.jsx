import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import { Link } from 'react-router';

import TeacherCard from '../components/TeacherCard';
import ReviewListItem from '../components/ReviewListItem';

export default class TeacherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {
        id: 1,
        name: 'Pepe Gonzales',
        url: 'pepe-gonzales',
        rating: 4,
        schoolID: 132,
        schoolName: 'Colegio Rapido',
        schoolUrl: 'colegio-rapido',
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
      reviews: [
        {
          id: 1,
          createdAt: new Date(),
          name: 'Pepito Sanchez',
          comment: 'Ensena muy bien y me gusto la clase, awdowdhaw, adohwodhaw aodhawohdoawhdoawhd ahdawodhaowhdoawhdoahwdohawodh',
          rating: 3,
          gradeReceived: 10,
          takesAttendance: false,
          wouldTakeAgain: true,
        },
        {
          id: 2,
          createdAt: new Date(),
          name: 'Sandro Gonzales',
          comment: 'Ensena muy bien y me gusto la clase, awdowdhaw, adohwodhaw aodhawohdoawhdoawhd ahdawodhaowhdoawhdoahwdohawodh',
          rating: 4,
          gradeReceived: 15,
          takesAttendance: true,
          wouldTakeAgain: false,
        },
      ],
    };
  }

  render() {
    const reviewList = this.state.reviews.map(review => (
      <ReviewListItem key={review.id} review={review} />
    ));
    return (
      <div>
        {!this.state.teacher ?
          'loading....'
        :
          <div>
            <TeacherCard teacher={this.state.teacher} />
            <Paper zDepth={4}>
              <List style={{ marginTop: 25 }}>
                <div className="row">
                  <div className="col-xs-6">
                    <Subheader>Reviews: </Subheader>
                  </div>
                  <div className="col-xs-6">
                    <Link to={`${this.props.location.pathname}/review`}>
                      <RaisedButton
                        label="Comenta"
                        labelPosition="before"
                        primary
                        icon={<BorderColor />}
                        style={{ float: 'right', marginRight: '10px', marginTop: '5px' }}
                      />
                    </Link>
                  </div>
                </div>
                {reviewList.length === 0 ?
                  <Subheader style={{ textAlign: 'center' }}>Todavia no hay reviews para este profesor...</Subheader>
                :
                  reviewList
                }
              </List>
            </Paper>
          </div>
        }
      </div>
    );
  }
}

TeacherPage.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};
