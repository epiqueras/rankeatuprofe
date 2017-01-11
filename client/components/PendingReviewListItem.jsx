import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';
import StarRatingComponent from 'react-star-rating-component';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionEvent from 'material-ui/svg-icons/action/event';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import DoNotDisturbAlt from 'material-ui/svg-icons/notification/do-not-disturb-alt';

import './ListItem.css';

import mapGradeToNumber from '../utils/mapGradeToNumber';
import apiCaller from '../utils/apiCaller';

const PendingReviewListItem = ({ review, removePending }) => {
  const acceptReview = () => (
    apiCaller(`/admin-accept-review/${review._id}`, 'put').then((res) => {
      if (res.result === 'success') {
        return removePending(review);
      }
      return null;
    })
  );

  const deleteReview = () => {
    apiCaller(`/admin-delete-review/${review._id}`, 'delete').then((res) => {
      if (res.result === 'success') {
        return removePending(review);
      }
      return null;
    });
  };

  return (
    <ListItem disabled>
      <Paper zDepth={3} className="row center-xs">
        <div className="col-xs-12">
          <div className="row center-xs groove-border">
            <div className="col-xs-6"><ActionFace /><strong><em>{review.name}</em></strong></div>
            <div className="col-xs-6">
              <ActionEvent />
              <strong><em>{(new Date(review.createdAt)).toLocaleDateString()}</em></strong>
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
                  emptyStarColor={'#232323'}
                />
              </div>
              <br />
              <div className="row center-xs">
                <em>Nota Recibida:</em>&nbsp;<strong>{mapGradeToNumber[review.grade]}/20</strong>
              </div>
              <br />
              <div className="row center-xs">
                <em>Toma Asistencia:</em>
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
        <FlatButton onTouchTap={deleteReview} primary label="Borrar" />
        <FlatButton onTouchTap={acceptReview} primary label="Aceptar" />
      </Paper>
    </ListItem>
  );
};

PendingReviewListItem.propTypes = {
  review: React.PropTypes.object,
  removePending: React.PropTypes.func,
};

export default PendingReviewListItem;
