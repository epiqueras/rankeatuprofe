import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import StarRatingComponent from 'react-star-rating-component';
import SocialSchool from 'material-ui/svg-icons/social/school';
import { Pie } from 'react-chartjs-2';

import './tOrSCard.css';

const SchoolCard = ({ school }) => {
  const wouldTakeAgainString = school.wouldTakeAgain < (school.wouldTakeAgain / 2) ?
    `${school.numberOfReviews - school.wouldTakeAgain}/${school.numberOfReviews} dijeron que no`
  :
    `${school.wouldTakeAgain}/${school.numberOfReviews} dijeron que si`;
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
        school.zeroToTwo,
        school.threeToFive,
        school.sixToEight,
        school.nineToEleven,
        school.twelveToFourteen,
        school.fifteenToSeventeen,
        school.eighteenToTwenty,
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
  const averageGrade = data.datasets[0].data.reduce((accumulator, currentValue, currentIndex) => (
    accumulator + (((currentIndex * 3) + 1) * currentValue)
  ), 0) / school.numberOfReviews;
  return (
    <div className="row">
      <div className="col-xs-12">
        <Paper zDepth={5} className="card-background">
          <div className="row center-xs middle-xs">
            <div className="col-xs-12 name-and-school">
              <span><SocialSchool /><strong>{school.name}</strong></span>
            </div>
            <div className="col-xs-12">
              <Divider />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h3>Reviews totales: {school.numberOfReviews}</h3>
              <StarRatingComponent
                name="ranking"
                editing={false}
                starCount={5}
                value={school.averageRating}
                className="card-rating"
              />
              <h6>Promedio: {school.averageRating}</h6>
            </div>
            <div className="col-xs-12 hide-in-sm">
              <Divider />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
              <h3>Distribucion de notas: {school.numberOfReviews}</h3>
              {graph}
              <h6>Promedio: {averageGrade}</h6>
            </div>
            <div className="col-xs-12">
              <Divider />
            </div>
            <div className="col-xs-12 attendance-and-retake">
              <span><strong>&quot;Lo tomaria de nuevo&quot;:</strong> {wouldTakeAgainString}</span>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

SchoolCard.propTypes = {
  school: React.PropTypes.object,
};

export default SchoolCard;
