import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

import './ListItem.css';

import { go } from '../utils/goBack';

const TeacherListItem = ({ teacher, inSchoolList }) => (
  <ListItem
    primaryText={teacher.name}
    leftIcon={<ActionBook />}
    primaryTogglesNestedList
    nestedItems={!inSchoolList ?
    [
      <Link onTouchTap={go} key={1} to={`/profesor/${teacher.slug}`} className="indent-item">
        <ListItem
          primaryText={`Reviews: ${teacher.rating}/5`}
          leftIcon={<ActionGrade />}
        />
      </Link>,
      <Link onTouchTap={go} key={2} to={`/escuela/${teacher.schoolSlug}`} className="indent-item">
        <ListItem
          primaryText={teacher.school}
          leftIcon={<SocialSchool />}
        />
      </Link>,
    ]
    :
    [
      <Link onTouchTap={go} key={1} to={`/profesor/${teacher.slug}`} className="indent-item">
        <ListItem
          primaryText={`Reviews: ${teacher.rating}/5`}
          leftIcon={<ActionGrade />}
        />
      </Link>,
    ]
    }
  />
);

TeacherListItem.propTypes = {
  teacher: React.PropTypes.object,
  inSchoolList: React.PropTypes.bool,
};

export default TeacherListItem;
