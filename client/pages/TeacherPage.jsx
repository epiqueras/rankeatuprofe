/* global window */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import { Link } from 'react-router';

import apiCaller from '../utils/apiCaller';

import TeacherCard from '../components/TeacherCard';
import ReviewListItem from '../components/ReviewListItem';

export default class TeacherPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      teacher: this.context.data.teacher || {},
      reviews: this.context.data.reviews || [],
    };
  }

  componentDidMount() {
    this.fetchTeacher();
  }

  fetchTeacher() {
    return apiCaller(`/profesor/${this.props.params.slug}`).then(res => (
      this.setState({ teacher: res.teacher, reviews: res.reviews })
    ));
  }

  render() {
    const reviewList = this.state.reviews.map(review => (
      <ReviewListItem key={review._id} review={review} />
    ));
    return (
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
    );
  }
}

TeacherPage.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};

TeacherPage.contextTypes = {
  data: React.PropTypes.object,
};
