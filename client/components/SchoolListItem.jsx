import React from 'react';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import SocialSchool from 'material-ui/svg-icons/social/school';

import 'components/ListItem.css';

const SchoolListItem = ({ school }) => {
  const schoolUrlName = school.name.split(' ').join('-').toLowerCase();
  return (
    <ListItem
      primaryText={school.name}
      leftIcon={<SocialSchool />}
      primaryTogglesNestedList
      nestedItems={[
        <Link key={1} to={`/escuela/${schoolUrlName}`} className="indent-item">
          <ListItem
            key={1}
            primaryText={`Reviews: ${school.rating}/5`}
            leftIcon={<ActionGrade />}
          />
        </Link>,
      ]}
    />
  );
};

SchoolListItem.propTypes = {
  school: React.PropTypes.object,
};

export default SchoolListItem;
