import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

import 'components/ListItem.css';

const TeacherListItem = ({ teacher }) => {
  const teacherUrlName = teacher.name.split(' ').join('-').toLowerCase();
  const schoolUrlName = teacher.school.split(' ').join('-').toLowerCase();
  return (
    <ListItem
      primaryText={teacher.name}
      leftIcon={<ActionBook />}
      primaryTogglesNestedList
      nestedItems={[
        <Link key={1} to={`/profesor/${teacherUrlName}`} className="indent-item">
          <ListItem
            primaryText={`Reviews: ${teacher.rating}/5`}
            leftIcon={<ActionGrade />}
          />
        </Link>,
        <Link key={2} to={`/escuela/${schoolUrlName}`} className="indent-item">
          <ListItem
            primaryText={teacher.school}
            leftIcon={<SocialSchool />}
          />
        </Link>,
      ]}
    />
  );
};

TeacherListItem.propTypes = {
  teacher: React.PropTypes.object,
};

export default TeacherListItem;
