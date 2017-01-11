import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialSchool from 'material-ui/svg-icons/social/school';

import './ListItem.css';

import apiCaller from '../utils/apiCaller';

const PendingTeacherListItem = ({ teacher, removePending }) => {
  const acceptTeacher = () => (
    apiCaller(`/admin-accept-teacher/${teacher._id}`, 'put').then((res) => {
      if (res.result === 'success') {
        return removePending(teacher);
      }
      return null;
    })
  );

  const deleteTeacher = () => {
    apiCaller(`/admin-delete-teacher/${teacher._id}`, 'delete').then((res) => {
      if (res.result === 'success') {
        return removePending(teacher);
      }
      return null;
    });
  };

  return (
    <ListItem
      primaryText={teacher.name}
      leftIcon={<ActionBook />}
      primaryTogglesNestedList
      nestedItems={[
        <Link onTouchTap={acceptTeacher} key={1} className="indent-item">
          <ListItem
            primaryText={'Aceptar'}
            leftIcon={<ActionGrade />}
          />
        </Link>,
        <Link onTouchTap={deleteTeacher} key={2} className="indent-item">
          <ListItem
            primaryText={'Borrar'}
            leftIcon={<ActionGrade />}
          />
        </Link>,
        <Link key={3} to={`/escuela/${teacher.schoolSlug}`} className="indent-item">
          <ListItem
            primaryText={teacher.schoolName}
            leftIcon={<SocialSchool />}
          />
        </Link>,
      ]}
    />
  );
};

PendingTeacherListItem.propTypes = {
  teacher: React.PropTypes.object,
  removePending: React.PropTypes.func,
};

export default PendingTeacherListItem;
