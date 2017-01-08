import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import SocialSchool from 'material-ui/svg-icons/social/school';
import ActionBook from 'material-ui/svg-icons/action/book';

import './ListItem.css';

import { go } from '../utils/goBack';

const SchoolListItem = ({ school }) => (
  <ListItem
    primaryText={school.name}
    leftIcon={<SocialSchool />}
    primaryTogglesNestedList
    nestedItems={[
      <Link onTouchTap={go} key={1} to={`/escuela/${school.slug}`} className="indent-item">
        <ListItem
          key={1}
          primaryText={'Ver Profesores'}
          leftIcon={<ActionBook />}
        />
      </Link>,
    ]}
  />
);

SchoolListItem.propTypes = {
  school: React.PropTypes.object,
};

export default SchoolListItem;
