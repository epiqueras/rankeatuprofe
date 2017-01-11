import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import StarRatingComponent from 'react-star-rating-component';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';
import { Pie } from 'react-chartjs-2';

import './tOrSCard.css';

const TeacherCard = ({ teacher }) => {
  const attendanceString = teacher.takesAttendance < (teacher.numberOfReviews / 2) ?
      `${teacher.numberOfReviews - teacher.takesAttendance}/${teacher.numberOfReviews} dijeron que no`
    :
      `${teacher.takesAttendance}/${teacher.numberOfReviews} dijeron que si`;
  const wouldTakeAgainString = teacher.wouldTakeAgain < (teacher.numberOfReviews / 2) ?
    `${teacher.numberOfReviews - teacher.wouldTakeAgain}/${teacher.numberOfReviews} dijeron que no`
  :
    `${teacher.wouldTakeAgain}/${teacher.numberOfReviews} dijeron que si`;
  const data = {
    labels: [
      '0-2',
      '3-5',
      '6-8',
      '9-11',
      '12-14',
      '15-17',
      '18-20',
    ],
    datasets: [{
      data: [
        teacher.zeroToTwo,
        teacher.threeToFive,
        teacher.sixToEight,
        teacher.nineToEleven,
        teacher.twelveToFourteen,
        teacher.fifteenToSeventeen,
        teacher.eighteenToTwenty,
      ],
      backgroundColor: [
        '#FF6384',
        '#D4727D',
        '#AA8177',
        '#7F9170',
        '#55A06A',
        '#2AAF63',
        '#00BF5D',
      ],
      borderWidth: 1,
    }],
  };
  const graph = (<Pie data={data} />);
  let averageGrade = (data.datasets[0].data.reduce((accumulator, currentValue, currentIndex) => (
    accumulator + (((currentIndex * 3) + 1) * currentValue)
  ), 0) / teacher.numberOfReviews);
  averageGrade = averageGrade && averageGrade.toFixed(2);
  const teacherRating = (
    (teacher.rZero * 0) + (teacher.rOne * 1)
    + (teacher.rTwo * 2) + (teacher.rThree * 3)
    + (teacher.rFour * 4) + (teacher.rFive * 5)
  ) / teacher.numberOfReviews;
  return (
    <div className="row">
      <div className="col-xs-12">
        <Paper zDepth={5} className="card-background">
          <div className="row center-xs middle-xs">
            <div className="col-xs-12 name-and-school">
              <div className="row center-xs">
                <div className="col-xs-12 col-sm-3">
                  <span><ActionBook /><strong>{teacher.name}</strong></span>
                </div>
                <br />
                <br />
                <div className="col-xs-12 col-sm-3">
                  <span><SocialSchool /><strong>{teacher.schoolName}</strong></span>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <Divider />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h3>Reviews totales: {teacher.numberOfReviews}</h3>
              <StarRatingComponent
                name="ranking"
                editing={false}
                starCount={5}
                value={teacherRating}
                className="card-rating"
              />
              <h6>Promedio: {teacherRating}</h6>
            </div>
            <div className="col-xs-12 hide-in-sm">
              <Divider />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h3>Distribucion de notas: {teacher.numberOfReviews}</h3>
              {graph}
              <h6>Promedio: {averageGrade}</h6>
            </div>
            <div className="col-xs-12">
              <Divider />
            </div>
            <div className="col-xs-12 attendance-and-retake">
              <div className="row center-xs">
                <div className="col-xs-12 col-sm-3">
                  <span><strong>Toma atendencia:</strong> {attendanceString}</span>
                </div>
                <br />
                <br />
                <div className="col-xs-12 col-sm-3">
                  <span>
                    <strong>&quot;Lo tomaria de nuevo&quot;:</strong> {wouldTakeAgainString}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

TeacherCard.propTypes = {
  teacher: React.PropTypes.object,
};

export default TeacherCard;
