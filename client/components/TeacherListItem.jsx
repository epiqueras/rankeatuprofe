import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

import './ListItem.css';

import { go } from '../utils/goBack';

const TeacherListItem = ({ teacher, inSchoolList }) => {
  const teacherRating = (
    (teacher.rZero * 0) + (teacher.rOne * 1)
    + (teacher.rTwo * 2) + (teacher.rThree * 3)
    + (teacher.rFour * 4) + (teacher.rFive * 5)
  ) / teacher.numberOfReviews;
  return (
    <ListItem
      primaryText={teacher.name}
      leftIcon={<ActionBook />}
      primaryTogglesNestedList
      nestedItems={!inSchoolList ?
      [
        <Link onTouchTap={go} key={1} to={`/profesor/${teacher.slug}`} className="indent-item">
          <ListItem
            primaryText={`Ver Reviews: ${teacherRating}/5`}
            leftIcon={<ActionGrade />}
          />
        </Link>,
        <Link onTouchTap={go} key={2} to={`/escuela/${teacher.schoolSlug}`} className="indent-item">
          <ListItem
            primaryText={teacher.schoolName}
            leftIcon={<SocialSchool />}
          />
        </Link>,
      ]
      :
      [
        <Link onTouchTap={go} key={1} to={`/profesor/${teacher.slug}`} className="indent-item">
          <ListItem
            primaryText={`Ver Reviews: ${teacherRating}/5`}
            leftIcon={<ActionGrade />}
          />
        </Link>,
      ]
      }
    />
  );
};

TeacherListItem.propTypes = {
  teacher: React.PropTypes.object,
  inSchoolList: React.PropTypes.bool,
};

export default TeacherListItem;
