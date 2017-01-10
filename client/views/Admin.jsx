import React from 'react';
import RootHelmet from './RootHelmet';

const Admin = ({ children }) => (
  <div>
    <RootHelmet />
    {children}
  </div>
);

Admin.propTypes = {
  children: React.PropTypes.object,
};

export default Admin;
