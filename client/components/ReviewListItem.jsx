import React from 'react';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import StarRatingComponent from 'react-star-rating-component';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionEvent from 'material-ui/svg-icons/action/event';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import DoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';

import './ListItem.css';

const ReviewListItem = ({ review }) => (
  <ListItem disabled>
    <Paper zDepth={3} className="row center-xs">
      <div className="col-xs-12">
        <div className="row center-xs groove-border">
          <div className="col-xs-6"><ActionFace /><strong><em>{review.name}</em></strong></div>
          <div className="col-xs-6">
            <ActionEvent />
            <strong><em>{review.createdAt.toDateString()}</em></strong>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-2 groove-border review-stats">
            <div className="row center-xs">
              <StarRatingComponent
                name="ranking"
                editing={false}
                starCount={5}
                value={review.rating}
                className="review-rating"
              />
            </div>
            <br />
            <div className="row center-xs">
              <em>Nota Recibida:</em>&nbsp;<strong>{review.gradeReceived}/20</strong>
            </div>
            <br />
            <div className="row center-xs">
              <em>Toma Atendencia:</em>
              &nbsp;
              <strong>
                {review.takesAttendance ?
                  <CheckCircle className="yes-or-no" />
                :
                  <DoNotDisturbAlt className="yes-or-no" />
                }
              </strong>
            </div>
            <br />
            <div className="row center-xs">
              <em>Tomaria de Nuevo:</em>
              &nbsp;
              <strong>
                {review.wouldTakeAgain ?
                  <CheckCircle className="yes-or-no" />
                :
                  <DoNotDisturbAlt className="yes-or-no" />
                }
              </strong>
            </div>
          </div>
          <div className="col-xs-12 col-sm-10 groove-border" style={{ lineHeight: '25px' }}>{review.comment}</div>
        </div>
      </div>
    </Paper>
  </ListItem>
);

ReviewListItem.propTypes = {
  review: React.PropTypes.object,
};

export default ReviewListItem;
