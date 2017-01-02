import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

import './ListItem.css';

const TeacherListItem = ({ teacher, inSchoolList }) => (
  <ListItem
    primaryText={teacher.name}
    leftIcon={<ActionBook />}
    primaryTogglesNestedList
    nestedItems={!inSchoolList ?
    [
      <Link key={1} to={`/profesor/${teacher.url}`} className="indent-item">
        <ListItem
          primaryText={`Reviews: ${teacher.rating}/5`}
          leftIcon={<ActionGrade />}
        />
      </Link>,
      <Link key={2} to={`/escuela/${teacher.schoolUrl}`} className="indent-item">
        <ListItem
          primaryText={teacher.school}
          leftIcon={<SocialSchool />}
        />
      </Link>,
    ]
    :
    [
      <Link key={1} to={`/profesor/${teacher.url}`} className="indent-item">
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
