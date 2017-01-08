import React from 'react';
import RootHelmet from './RootHelmet';

const Home = ({ children }) => (
  <div>
    <RootHelmet />
    {children}
  </div>
);

Home.propTypes = {
  children: React.PropTypes.object,
};

export default Home;
